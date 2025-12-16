import React, { Component, createRef } from 'react';
import { firebaseConfig } from './firebase/creds'
import $, { data } from "jquery";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, child, get, set, remove } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getStorage, getDownloadURL, listAll } from "firebase/storage";
import "./CSS/styles.css";
import "./CSS/research.css";
import "./CSS/awards.css";
import "./CSS/footer.css";

import toast, { Toaster } from 'react-hot-toast';
import isEqual from 'lodash.isequal';
import 'react-tabs/style/react-tabs.css';
import 'quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

const paginatedPaper = [
  {
    "key": "pub-2025-001",
    "Title": "Are CEOs Rewarded for Luck? Evidence from Corporate Tax Windfalls",
    "Authors": "Andreani, M., Ellahie, A., & Shivakumar, L.",
    "Publishing Year": "2025",
    "Journal": "Journal of Finance, 80(4), 2255–2302",
    "Conference": "nan",
    "Paper Type": "Publications",
    "Abstract": "CEOs with weak oversight were rewarded for windfall tax gains from the 2017 Tax Cuts and Jobs Act but not penalized for losses, suggesting pay reflects rent extraction rather than performance.",
    "Citations": "nan",
    "Paper Link": "https://onlinelibrary.wiley.com/doi/10.1111/jofi.13448",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2025-002",
    "Title": "Measuring the Quality of Mergers and Acquisitions",
    "Authors": "Ellahie, A., Hshieh, S., & Zhang, F.",
    "Publishing Year": "2025",
    "Journal": "Management Science, 71(1), 779–802",
    "Conference": "nan",
    "Paper Type": "Publications",
    "Abstract": "High-IRI M&As, requiring large post-acquisition ROE gains, tend to underperform due to overestimated synergies and CEO overconfidence.",
    "Citations": "nan",
    "Paper Link": "https://pubsonline.informs.org/doi/10.1287/mnsc.2023.01225",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2024-001",
    "Title": "Accounting for Bubbles: A Discussion of Arif and Sul (2024)",
    "Authors": "Ellahie, A.",
    "Publishing Year": "2024",
    "Journal": "Journal of Accounting and Economics, 78(2–3), 101717",
    "Conference": "2023 JAE Conference",
    "Paper Type": "Publications",
    "Abstract": "Arif and Sul (2024) show that industry-level NOA accruals predict future crashes and lower returns, highlighting sentiment-driven overinvestment as a signal of asset pricing bubbles.",
    "Citations": "nan",
    "Paper Link": "https://www.sciencedirect.com/science/article/abs/pii/S0165410124000478?via%3Dihub",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2022-001",
    "Title": "Growth Matters: Disclosure and Risk Premium",
    "Authors": "Ellahie, A., Hayes, R., & Plumlee, M.",
    "Publishing Year": "2022",
    "Journal": "The Accounting Review, 97(4), 259–286",
    "Conference": "nan",
    "Paper Type": "Publications",
    "Abstract": "The association between disclosure and risk premium depends on firm growth: it is negative for low-growth firms but less negative or even positive for high-growth firms.",
    "Citations": "nan",
    "Paper Link": "https://publications.aaahq.org/accounting-review/article-abstract/97/4/259/315/Growth-Matters-Disclosure-and-Risk-Premium?redirectedFrom=fulltext",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2022-002",
    "Title": "The Role of Disclosure and Information Intermediaries in an Unregulated Capital Market: Evidence from Initial Coin Offerings",
    "Authors": "Bourveau, T., De George, E., Ellahie, A., & Macciocchi, D.",
    "Publishing Year": "2022",
    "Journal": "Journal of Accounting Research, 60(1), 129–167",
    "Conference": "nan",
    "Paper Type": "Publications",
    "Abstract": "Higher voluntary disclosure and credible information intermediaries help ICO ventures raise more capital, highlighting their role in supporting the unregulated crypto-token market.",
    "Citations": "nan",
    "Paper Link": "https://onlinelibrary.wiley.com/doi/10.1111/1475-679X.12404",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2021-001",
    "Title": "Show Me the Money! Dividend Policy in Countries with Weak Institutions",
    "Authors": "Ellahie, A., & Kaplan, Z.",
    "Publishing Year": "2021",
    "Journal": "Journal of Accounting Research, 59(2), 613–655",
    "Conference": "nan",
    "Paper Type": "Publications",
    "Abstract": "In weak-institution countries, firms use faster-adjusting, early dividend policies to signal lower agency conflicts and improve their ability to raise external capital.",
    "Citations": "nan",
    "Paper Link": "https://onlinelibrary.wiley.com/doi/10.1111/1475-679X.12363",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2021-002",
    "Title": "Management Forecasts of Volatility",
    "Authors": "Ellahie, A., & Peng, X.",
    "Publishing Year": "2021",
    "Journal": "Review of Accounting Studies, 26(2), 620–655",
    "Conference": "nan",
    "Paper Type": "Publications",
    "Abstract": "Management forecasts of expected volatility reveal private information and predict future stock and earnings volatility, but less so when earnings-management incentives are strong.",
    "Citations": "nan",
    "Paper Link": "https://link.springer.com/article/10.1007/s11142-020-09567-4",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2021-003",
    "Title": "Earnings Beta",
    "Authors": "Ellahie, A.",
    "Publishing Year": "2021",
    "Journal": "Review of Accounting Studies, 26(1), 81–122",
    "Conference": "nan",
    "Paper Type": "Publications",
    "Abstract": "An earnings beta based on price-scaled expectation shocks reliably measures systematic risk and explains cross-sectional returns, offering a simple and valid tool for future research.",
    "Citations": "nan",
    "Paper Link": "https://link.springer.com/article/10.1007/s11142-020-09561-w",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2017-001",
    "Title": "Do Common Inherited Beliefs and Values Influence CEO Pay?",
    "Authors": "Ellahie, A., Tahoun, A., & Tuna, İ.",
    "Publishing Year": "2017",
    "Journal": "Journal of Accounting and Economics, 64(2–3), 346–367",
    "Conference": "2016 JAE Conference",
    "Paper Type": "Publications",
    "Abstract": "CEO ethnicity affects pay and firing sensitivity, with larger changes when replaced by a CEO of a different ethnicity.",
    "Citations": "nan",
    "Paper Link": "https://www.sciencedirect.com/science/article/abs/pii/S0165410117300575?via%3Dihub",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "pub-2017-002",
    "Title": "Government Purchases Reloaded: Informational Insufficiency and Heterogeneity in Fiscal VARs",
    "Authors": "Ellahie, A., & Ricco, G.",
    "Publishing Year": "2017",
    "Journal": "Journal of Monetary Economics, 90, 13–27",
    "Conference": "Warsaw International Economic Meeting (2012)",
    "Paper Type": "Publications",
    "Abstract": "Government investment, particularly in education and health, strongly boosts output, unlike aggregate purchases.",
    "Citations": "nan",
    "Paper Link": "linkinghub.elsevier.com/retrieve/pii/S0304393217300624",
    "Slides": "nan",
    "Video": "nan"
  },

  // ---------- BOOK CHAPTER ----------
  {
    "key": "book-2024-001",
    "Title": "Disclosure in Initial Coin Offerings",
    "Authors": "Ellahie, A.",
    "Publishing Year": "2024",
    "Journal": "The Palgrave Encyclopedia of Private Equity",
    "Conference": "nan",
    "Paper Type": "Book Chapters",
    "Abstract": "An ICO lets a blockchain start-up raise funds by selling tokens, which can serve as a medium of exchange, store of value, utility, investment, or DeFi tool.",
    "Citations": "nan",
    "Paper Link": "https://link.springer.com/rwe/10.1007/978-3-030-38738-9_217-1",
    "Slides": "nan",
    "Video": "nan"
  },

  // ---------- WORKING PAPERS ----------
  {
    "key": "wp-001",
    "Title": "Uncertain Earnings Betas",
    "Authors": "Breuer, M., Ellahie, A., & Schütt, H.",
    "Publishing Year": "nan",
    "Journal": "nan",
    "Conference": "nan",
    "Paper Type": "Working Papers",
    "Abstract": "nan",
    "Citations": "nan",
    "Paper Link": "nan",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "wp-002",
    "Title": "Technically, Technical Analysis is Fundamental Analysis",
    "Authors": "Ellahie, A., Kaplan, Z., & Potter, C.",
    "Publishing Year": "nan",
    "Journal": "nan",
    "Conference": "nan",
    "Paper Type": "Working Papers",
    "Abstract": "nan",
    "Citations": "nan",
    "Paper Link": "nan",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "wp-003",
    "Title": "Levering Up! Short-horizon Option Availability and the Gamification of the Stock Market",
    "Authors": "Ellahie, A., Kaplan, Z., & Potter, C.",
    "Publishing Year": "nan",
    "Journal": "nan",
    "Conference": "nan",
    "Paper Type": "Working Papers",
    "Abstract": "nan",
    "Citations": "nan",
    "Paper Link": "nan",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "wp-004",
    "Title": "Signaling in the Twilight Zone: Disclosure and Credibility in the OTC Market",
    "Authors": "Bourveau, T., De George, E., Ellahie, A., Gaulin, M., & Wang, D.",
    "Publishing Year": "nan",
    "Journal": "nan",
    "Conference": "nan",
    "Paper Type": "Working Papers",
    "Abstract": "nan",
    "Citations": "nan",
    "Paper Link": "nan",
    "Slides": "nan",
    "Video": "nan"
  },
  {
    "key": "wp-005",
    "Title": "Are Disclosed Merger Synergies Realized?",
    "Authors": "Ellahie, A., Huang, X., Tuna, İ., & Vincenzi, R.",
    "Publishing Year": "nan",
    "Journal": "nan",
    "Conference": "nan",
    "Paper Type": "Working Papers",
    "Abstract": "nan",
    "Citations": "nan",
    "Paper Link": "nan",
    "Slides": "nan",
    "Video": "nan"
  }
]

const teachingList = [
  {
    "category": "MAcc/MSF/MBA/PMBA",
    "title": "Mergers & Acquisitions",
    "university": "University of Utah",
    "years": "2023 – Present",
    "ratings": [
      { "year": 2023, "rating": "5.7/6.0" },
      { "year": 2024, "rating": "5.9/6.0" },
      { "year": 2025, "rating": "5.8/6.0" }
    ]
  },
  {
    "category": "MAcc/MSF/MBA/PMBA",
    "title": "Business Valuation and Analysis",
    "university": "University of Utah",
    "years": "2024 – Present",
    "ratings": [
      { "year": 2024, "rating": "5.2/6.0" },
      { "year": 2025, "rating": "5.4/6.0" }
    ]
  },
  {
    "category": "Executive Education",
    "title": "Finance for the Non-Financial Leader",
    "university": "University of Utah",
    "years": "2023 – Present",
    "ratings": []
  },
  {
    "category": "PhD",
    "title": "Accounting PhD Seminar",
    "university": "University of Utah",
    "years": "Fall 2024",
    "ratings": []
  },
  {
    "category": "Undergraduate",
    "title": "Business Fundamentals of Accounting",
    "university": "University of Utah",
    "years": "2021 – 2022",
    "ratings": [
      { "year": 2021, "rating": "5.4/6.0" },
      { "year": 2022, "rating": "5.7/6.0" }
    ]
  },
  {
    "category": "Undergraduate",
    "title": "Intermediate Accounting",
    "university": "University of Utah",
    "years": "2018 – 2020",
    "ratings": [
      { "year": 2018, "rating": "5.7/6.0" },
      { "year": 2019, "rating": "5.8/6.0" },
      { "year": 2020, "rating": "5.8/6.0" }
    ]
  },
  {
    "category": "MAcc/MSF/MBA/PMBA",
    "title": "Financial Reporting Analysis",
    "university": "University of Utah",
    "years": "2015 – 2017",
    "ratings": [
      { "year": 2015, "rating": "5.3/6.0" },
      { "year": 2016, "rating": "5.3/6.0" },
      { "year": 2017, "rating": "5.5/6.0" }
    ]
  }
]

const awardsList = [
  {
    "id": 1,
    "date": "2023, 2024",
    "name": "Excellence in Refereeing Award",
    "description": "Journal of Accounting Research"
  },
  {
    "id": 2,
    "date": "2024",
    "name": "Top Referee Award",
    "description": "Review of Accounting Studies"
  },
  {
    "id": 3,
    "date": "2024",
    "name": "Outstanding Reviewer Award",
    "description": "The Accounting Review"
  },
  {
    "id": 4,
    "date": "2024",
    "name": "AAA FARS Outstanding Service Award",
    "description": "American Accounting Association"
  },
  {
    "id": 5,
    "date": "2023",
    "name": "Daniels Fund Leadership in Ethics Education Award",
    "description": "University of Utah"
  },
  {
    "id": 6,
    "date": "2023",
    "name": "Dr. Rodney H. Brady Faculty Superior Teaching Award",
    "description": "University of Utah"
  },
  {
    "id": 7,
    "date": "2022, 2023, 2024",
    "name": "David Eccles Faculty Fellow Award",
    "description": "University of Utah"
  },
  {
    "id": 8,
    "date": "2017, 2020, 2021, 2023",
    "name": "AAA FARS Excellence in Reviewing Award",
    "description": "American Accounting Association"
  },
  {
    "id": 9,
    "date": "2020, 2021",
    "name": "David Eccles Emerging Scholar Award",
    "description": "University of Utah"
  },
  {
    "id": 10,
    "date": "2020",
    "name": "Kenneth J. Hanni Teaching Award",
    "description": "University of Utah"
  },
  {
    "id": 11,
    "date": "2018, 2019",
    "name": "H. James Griggs-FIA Fellow Award",
    "description": "University of Utah"
  },
  {
    "id": 12,
    "date": "2010 – 2015",
    "name": "PhD Program Financial Award",
    "description": "London Business School"
  },
  {
    "id": 13,
    "date": "2012",
    "name": "Best Paper Prize for Young Economists",
    "description": "Warsaw International Economic Meeting"
  },
  {
    "id": 14,
    "date": "2006, 2007",
    "name": "Performance Award for Leadership in Recruiting and Training",
    "description": "UBS Investment Bank"
  },
  {
    "id": 15,
    "date": "1999",
    "name": "Distinction Awarded for MSc Degree",
    "description": "London School of Economics"
  },
  {
    "id": 16,
    "date": "1997",
    "name": "Askari Bank Gold Medal for Best Student in Banking",
    "description": "Lahore University of Management Sciences"
  },
  {
    "id": 17,
    "date": "1996, 1997",
    "name": "Dean’s Honor Roll",
    "description": "Lahore University of Management Sciences"
  }
]

const conferenceList = [
  { "Year": 2026, "Title": "Rice University", "role": "Scheduled", "category": "Workshop/Presentation" },

  { "Year": 2025, "Title": "Maastricht University", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2025, "Title": "Tilburg University", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2024, "Title": "LSE Economics of Accounting Conference", "role": "Discussant", "category": "Workshop/Presentation" },
  { "Year": 2024, "Title": "Utah Winter Accounting Conference (UWAC)", "role": "Discussant", "category": "Workshop/Presentation" },

  { "Year": 2023, "Title": "Journal of Accounting and Economics Conference", "role": "Discussant", "category": "Workshop/Presentation" },

  { "Year": 2022, "Title": "Monash University", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2022, "Title": "Nanyang Technological University", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2022, "Title": "Rotman Accounting Conference", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2022, "Title": "Singapore Management University", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2022, "Title": "University of Miami", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2022, "Title": "University of Southern California", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2022, "Title": "University of Sydney", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2021, "Title": "2nd Boca Corp. Finance & Governance Conference", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2021, "Title": "Columbia Business School", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2021, "Title": "University of Texas Dallas", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2020, "Title": "Journal of Accounting Research Conference", "role": "Virtual", "category": "Workshop/Presentation" },

  { "Year": 2018, "Title": "AAA Western Region Conference", "role": "Discussant", "category": "Workshop/Presentation" },
  { "Year": 2018, "Title": "CARE Conference, University of Notre Dame", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2018, "Title": "Rutgers University", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2017, "Title": "Journal of Accounting, Auditing, and Finance Conference", "role": "Discussant", "category": "Workshop/Presentation" },
  { "Year": 2017, "Title": "University of Illinois at Chicago", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2017, "Title": "Washington University in St. Louis", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2016, "Title": "AAA Annual Meeting", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2016, "Title": "AFA Annual Meeting", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2016, "Title": "George Washington University Cherry Blossom Conference", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2016, "Title": "Journal of Accounting and Economics Conference", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2016, "Title": "University of Colorado Boulder", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2015, "Title": "Duke University", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2015, "Title": "Massachusetts Institute of Technology", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2015, "Title": "University of California Berkeley", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2015, "Title": "University of Chicago (Booth)", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2015, "Title": "University of Michigan", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2015, "Title": "University of North Carolina at Chapel Hill", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2015, "Title": "University of Pennsylvania (Wharton)", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2015, "Title": "University of Utah", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2014, "Title": "AAA Annual Meeting", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2014, "Title": "AQR Capital Management", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2014, "Title": "EAA Annual Meeting", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2014, "Title": "London School of Economics", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2013, "Title": "EEA Annual Meeting", "role": "Presenter", "category": "Workshop/Presentation" },

  { "Year": 2012, "Title": "AAA Annual Meeting", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2012, "Title": "JAR/FRBNY Conference", "role": "Presenter", "category": "Workshop/Presentation" },
  { "Year": 2012, "Title": "LBS Trans-Atlantic Doctoral Conference (TADC)", "role": "Presenter", "category": "Workshop/Presentation" },

  /* ----- Conference Participation Section ----- */

  { "Year": 2025, "Title": "INSEAD Accounting Symposium", "role": "Scheduled", "category": "Conference Participation" },
  { "Year": 2025, "Title": "Kelley Accounting Research Symposium", "role": "Scheduled", "category": "Conference Participation" },
  { "Year": 2025, "Title": "LSE Economics of Accounting Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2025, "Title": "NYU Big Apple Accounting Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2025, "Title": "University of Illinois Young Scholars Research Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2025, "Title": "Utah Winter Accounting Conference (UWAC)", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2025, "Title": "UTD-SMU Cowtown Accounting Conference", "role": "Scheduled", "category": "Conference Participation" },

  { "Year": 2024, "Title": "Bocconi Accounting Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2024, "Title": "LBS Accounting Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2024, "Title": "Minnesota Empirical Accounting Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2024, "Title": "Review of Accounting Studies Conference", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2023, "Title": "Bocconi Accounting Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2023, "Title": "Columbia Burton Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2023, "Title": "LBS Accounting Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2023, "Title": "Michigan Kapnick Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2023, "Title": "RAST Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2023, "Title": "UWAC", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2023, "Title": "WashU Dopuch Conference", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2022, "Title": "Carbon Disclosures Conference (Stanford)", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2022, "Title": "LAG Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2022, "Title": "LBS Accounting Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2022, "Title": "Miami Winter Warm-up Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2022, "Title": "JAR Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2022, "Title": "RAST Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2022, "Title": "UWAC", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2021, "Title": "JAR Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2021, "Title": "Miami Winter Warm-up Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2021, "Title": "RAST Conference", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2020, "Title": "RAST Conference", "role": "Virtual", "category": "Conference Participation" },
  { "Year": 2020, "Title": "UWAC", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2019, "Title": "Columbia Burton Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2019, "Title": "LBS Accounting Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2019, "Title": "Michigan Kapnick Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2019, "Title": "UWAC", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2018, "Title": "LBS Accounting Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2018, "Title": "RAST Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2018, "Title": "UWAC", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2018, "Title": "WashU Dopuch Accounting Conference", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2017, "Title": "CAR Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2017, "Title": "Columbia Burton Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2017, "Title": "LBS Accounting Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2017, "Title": "UWAC", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2016, "Title": "CAR Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2016, "Title": "CARE Conference", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2016, "Title": "LBS Accounting Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2016, "Title": "UWAC", "role": "Presenter", "category": "Conference Participation" },

  { "Year": 2015, "Title": "LBS Accounting Symposium", "role": "Presenter", "category": "Conference Participation" },
  { "Year": 2015, "Title": "RAST Conference", "role": "Presenter", "category": "Conference Participation" }
]




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
var storage = getStorage(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const api = process.env.REACT_APP_API;
const video_api = process.env.REACT_APP_VIDEO_API;

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      data: process.env.REACT_APP_TOKEN,
      currentProfile: process.env.REACT_APP_TOKEN,
      currentProfileData: {},
      socialMedia: {},
      allPapers: [],
      allVideos: [],
      allTeachingVideos: [],
      allTeachingMaterials: [],
      allBooks: [],
      allConfarences: [],
      languages: [],
      interests: [],
      researches: [],
      allClasses: [],
      s_query: '',
      currentPage: 0,
      currentPage2: 0,
      currentPageTM: 0,
      studentsPerPage: 5,
      conferencePerPage: 9,
      teachingPerPage: 30,
      currentPaperType: 'Publications',
      expandedIndexes: [],
      currentTeachingTitle: "",
      currentTeachingCls: "",
      currentPos2: 1,
      allAwards: [],
      open: false,
      teachingOpen: false,
      conferenceOpen: false,
      selected: "",
      inputOpen: false,
      teachingSelected: "",
      teachingInputOpen: false,
      conferenceSelected: "",
      conferenceInputOpen: false,
      searchValue: "",
      teachingSearchValue: "",
      pubSearchValue: "",
      conferenceSearchValue: "",
      sidebarOpen: false,
      screenWidth: document.documentElement.clientWidth,
      visiblePapers: [],   // items currently shown
      loadCount: 9,       // how many to load per scroll
      isFetching: false,
      openIndex: null,
      expanded: false,
      height: 300,
      selectedCategory: "All",
      activeCategory: "All"
    };
    this.boxRef = createRef();
  }

  componentDidMount() {
    this.clearStateOnce("adeorrev3");
    this.loadState();
    this.loadDataForCurrentProfile(this.state.currentProfile);
    window.addEventListener("resize", this.handleResize);

    // Load first items
    const papers = this.getPaginatedPaperDetails(); // your function
    this.setState({
      allPapers: papers,
      visiblePapers: papers.slice(0, this.state.studentsPerPage)
    });

    // Attach scroll listener
    const box = document.getElementById("publicationsBox");
    if (box) {
      box.addEventListener("scroll", this.handleScroll);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);

    const box = document.getElementById("publicationsBox");
    if (box) {
      box.removeEventListener("scroll", this.handleScroll);
    }
  }

  clearStateOnce = (uid) => {
    var loader = localStorage.getItem('loader') || '';
    if (loader !== uid) {
      localStorage.removeItem('thisState');
      localStorage.setItem('loader', uid);
    }
  }

  loadState = () => {
    const savedState = localStorage.getItem('thisState');

    if (!savedState) return;

    const parsed = JSON.parse(savedState);

    // Remove selected so it resets on refresh
    delete parsed.selected;
    delete parsed.teachingSelected;
    delete parsed.conferenceSelected;

    delete parsed.open;
    delete parsed.teachingOpen;
    delete parsed.conferenceOpen;

    delete parsed.inputOpen;
    delete parsed.teachingInputOpen;
    delete parsed.conferenceInputOpen;

    delete parsed.searchValue;
    delete parsed.teachingSearchValue;
    delete parsed.pubSearchValue
    delete parsed.conferenceSearchValue;

    this.setState(parsed);

    const checkProfileInterval = setInterval(() => {
      if (this.state.currentProfile !== '') {
        clearInterval(checkProfileInterval);
        this.loadDataForCurrentProfile(this.state.currentProfile);
      }
    }, 1000);
  };
  handleCategoryFilter = (category) => {
    this.setState({ selectedCategory: category });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      const stateToSave = { ...this.state };

      // delete stateToSave.expandedIndexes;
      localStorage.setItem('thisState', JSON.stringify(stateToSave));
    }

    if (
      prevState.allPapers !== this.state.allPapers &&
      this.state.allPapers.length > 0 &&
      this.state.visiblePapers.length === 0
    ) {
      const firstBatch = this.state.allPapers.slice(0, this.state.loadCount);
      this.setState({ visiblePapers: firstBatch });
    }
  }


  loadProfileData = (uid) => {
    var userRef = ref(database, 'profile/' + uid);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          var profiles = [];
          profiles.push({
            key: snapshot.key,
            ...data
          });
          document.title = data.firstName + ' ' + data.lastName + ' | Academic Blog';
          this.setState({ profiles: profiles, currentProfileData: profiles[0] });
        } else {
          // console.log("No data available for this user.");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }

  loadDashboard = (uid, username, type) => {
    if (type === 'user') {
      this.loadProfileData(uid);
    }
  }

  showAlert = (message, typeClass = 'alert-error') => {
    if (typeClass === 'alert-error') {
      toast.error(message, {
        duration: 4000,
        position: 'top-center',

        // Styling
        style: {},
        className: 'alert-error',

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: 'red',
          secondary: '#fff',
        },

        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } else {
      toast.success(message, {
        duration: 4000,
        position: 'top-center',

        // Styling
        style: {},
        className: 'alert-success',

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: 'green',
          secondary: '#fff',
        },

        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  loadProfileState = (uid) => {
    this.setState({ currentProfile: uid });

    var key = uid;
    // get {} from this.state.profiles where key = key and set it as currentProfileData
    var currentProfileData = this.state.profiles.find(profile => profile.key === key);
    this.setState({ currentProfileData: currentProfileData });
  }

  loadSocialMedia = (uid) => {
    var userRef = ref(database, 'social-media/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        var metaTitle = data.metaTitle;
        var metaDescription = data.metaDesc;

        this.setState({ socialMedia: data });

        // TODO: Set meta tags
      } else {
        // console.log("No data available for this user.");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  loadPapers = (uid) => {
    var userRef = ref(database, 'papers/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null && typeof data !== 'undefined') {
          var papers = [];
          for (var key in data) {
            var paper = data[key];
            papers.push({
              key: key,
              ...paper
            });
          }
          this.setState({ allPapers: papers });
        } else {
          this.setState({ allPapers: [] });
        }
      } else {
        // console.log("No data available for this user.");
        this.setState({ allPapers: [] });
      }
    }).catch((error) => {
      console.error(error);
      this.setState({ allPapers: [] });
    });
  }

  loadVideos = (uid) => {
    var userRef = ref(database, 'videos/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null && typeof data !== 'undefined') {
          var videos = [];
          for (var key in data) {
            var video = data[key];
            videos.push({
              key: key,
              ...video
            });
          }
          this.setState({ allVideos: videos });
        } else {
          this.setState({ allVideos: [] });
        }
      } else {
        // console.log("No data available for this user.");
        this.setState({ allVideos: [] });
      }
    }).catch((error) => {
      console.error(error);
      this.setState({ allVideos: [] });
    });
  }

  loadTeachingVideos = (uid) => {
    var userRef = ref(database, 'teaching-videos/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null && typeof data !== 'undefined') {
          var videos = [];
          for (var key in data) {
            var video = data[key];
            videos.push({
              key: key,
              ...video
            });
          }
          this.setState({ allTeachingVideos: videos });
        } else {
          this.setState({ allTeachingVideos: [] });
        }
      } else {
        // console.log("No data available for this user.");
        this.setState({ allTeachingVideos: [] });
      }
    }).catch((error) => {
      console.error(error);
      this.setState({ allTeachingVideos: [] });
    });
  }

  loadTeachingMaterials = (uid) => {
    var userRef = ref(database, 'teaching-materials/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null && typeof data !== 'undefined') {
          var materials = [];
          for (var key in data) {
            var material = data[key];
            materials.push({
              key: key,
              ...material
            });
          }
          this.setState({ allTeachingMaterials: materials, currentTeachingTitle: materials[0]?.Title || "", currentTeachingCls: materials[0]?.Course || "" });
        } else {
          this.setState({ allTeachingMaterials: [] });
        }
      } else {
        // console.log("No data available for this user.");
        this.setState({ allTeachingMaterials: [] });
      }
    }).catch((error) => {
      console.error(error);
      this.setState({ allTeachingMaterials: [] });
    });
  }

  loadBooks = (uid) => {
    var userRef = ref(database, 'books/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null && typeof data !== 'undefined') {
          var books = [];
          for (var key in data) {
            var book = data[key];
            books.push({
              key: key,
              ...book
            });
          }
          this.setState({ allBooks: books });
        } else {
          this.setState({ allBooks: [] });
        }
      } else {
        this.setState({ allBooks: [] });
        // console.log("No data available for this user.");
      }
    }).catch((error) => {
      this.setState({ allBooks: [] });
      console.error(error);
    });
  }

  loadConfarences = (uid) => {
    var userRef = ref(database, 'confarences/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null && typeof data !== 'undefined') {
          var confarences = [];
          for (var key in data) {
            var conf = data[key];
            confarences.push({
              key: key,
              ...conf
            });
          }
          var awards = confarences.filter(cf => cf.CRN === 'Award' || cf.CRN === 'Award');
          awards.forEach(award => {
            if (award.Year && award.Year.includes('-')) {
              const parts = award.Year.split('-');
              award.year = parts[parts.length - 1].trim();
            } else {
              award.year = award.Year ? award.Year.trim() : '';
            }

            if (award.year && award.year.includes('.')) {
              award.year = award.year.split('.')[0];
            }

            if (isNaN(award.year)) {
              award.year = 0;
            } else {
              award.year = parseInt(award.year);
            }
          });

          // sort by year (descending)
          awards.sort((a, b) => b.year - a.year);

          // get unique awards based on Title and Year
          const uniqueAwards = [];
          const titlesYears = new Set();
          awards.forEach(award => {
            const titleYear = `${award.Title}-${award.year}`;
            if (!titlesYears.has(titleYear)) {
              titlesYears.add(titleYear);
              uniqueAwards.push(award);
            }
          });
          awards = uniqueAwards;

          this.setState({ allAwards: awards });
          var conferences_r = confarences.filter(cf => cf.CRN !== 'Award' && cf.CRN !== 'Award');
          this.setState({ allConfarences: conferences_r });
        } else {
          this.setState({ allConfarences: [] });
        }
      } else {
        this.setState({ allConfarences: [] });
        // console.log("No data available for this user.");
      }
    }).catch((error) => {
      this.setState({ allConfarences: [] });
      console.error(error);
    });
  }

  loadLanguages = (uid) => {
    var userRef = ref(database, 'languages/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val().languages;
        this.setState({ languages: data });
      } else {
        // console.log("No data available for this user.");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  loadInterests = (uid) => {
    var userRef = ref(database, 'interests/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val().interests;
        this.setState({ interests: data });
      } else {
        // console.log("No data available for this user.");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  loadResearches = (uid) => {
    var userRef = ref(database, 'researches/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val().researches;
        this.setState({ researches: data });
      } else {
        // console.log("No data available for this user.");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  loadClasses = (uid) => {
    var userRef = ref(database, 'classes/' + uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null && typeof data !== 'undefined') {
          var classes = [];
          for (var key in data) {
            var cls = data[key];
            classes.push({
              key: key,
              ...cls
            });
          }
          this.setState({ allClasses: classes });
        } else {
          this.setState({ allClasses: [] });
        }
      } else {
        this.setState({ allClasses: [] });
        // console.log("No data available for this user.");
      }
    }).catch((error) => {
      this.setState({ allClasses: [] });
      console.error(error);
    });
  }

  loadDataForCurrentProfile = (currentProfile) => {
    var userType = "user";
    var uid = this.state.data;

    this.loadSocialMedia(currentProfile);
    this.loadPapers(currentProfile);
    this.loadVideos(currentProfile);
    this.loadTeachingVideos(currentProfile);
    this.loadTeachingMaterials(currentProfile);
    this.loadBooks(currentProfile);
    this.loadConfarences(currentProfile);
    this.loadLanguages(currentProfile);
    this.loadInterests(currentProfile);
    this.loadResearches(currentProfile);
    this.loadClasses(currentProfile);

    if (userType === 'user') {
      this.loadProfileData(uid);
    }
  }

  resetAllSelectionForNewProfile = () => {
    this.setState({
      currentProfileData: {},
      socialMedia: {},
      allPapers: [],
      allVideos: [],
      allTeachingVideos: [],
      allTeachingMaterials: [],
      allBooks: [],
      allConfarences: [],
      allAwards: [],
      languages: [],
      interests: [],
      researches: [],
      allClasses: [],
      s_query: '',
      currentPage: 0,
      studentsPerPage: 10
    });
  }


  getPaginatedPaper() {
    const {
      pubSearchValue,
      currentPage,
      studentsPerPage,
      currentPaperType
    } = this.state;

    // clone data to avoid mutation
    let filteredStudents = paginatedPaper.map(paper => {
      const updatedPaper = { ...paper };

      // Ensure Paper Type exists
      if (!updatedPaper["Paper Type"] || updatedPaper["Paper Type"] === "") {
        updatedPaper["Paper Type"] = "Publications";
      }

      // Clean "nan", trim spaces, remove commas
      for (const key in updatedPaper) {
        if (updatedPaper[key] === "nan") {
          updatedPaper[key] = "";
        }

        if (typeof updatedPaper[key] === "string") {
          updatedPaper[key] = updatedPaper[key].trim();

          if (updatedPaper[key].startsWith(",")) {
            updatedPaper[key] = updatedPaper[key].substring(1).trim();
          }

          if (updatedPaper[key].endsWith(",")) {
            updatedPaper[key] = updatedPaper[key]
              .substring(0, updatedPaper[key].length - 1)
              .trim();
          }
        }
      }

      // Normalize publishing year (e.g. 2020.0 → 2020)
      if (
        updatedPaper["Publishing Year"] &&
        updatedPaper["Publishing Year"].includes(".")
      ) {
        updatedPaper["Publishing Year"] =
          updatedPaper["Publishing Year"].split(".")[0];
      }

      return updatedPaper;
    });

    // Filter by paper type
    filteredStudents = filteredStudents.filter(
      paper => paper["Paper Type"] === currentPaperType
    );

    // Sort by Publishing Year (latest first, empty last)
    filteredStudents.sort((a, b) => {
      if (!a["Publishing Year"] && !b["Publishing Year"]) return 0;
      if (!a["Publishing Year"]) return 1;
      if (!b["Publishing Year"]) return -1;
      return (
        new Date(b["Publishing Year"]) - new Date(a["Publishing Year"])
      );
    });

    // 🔍 Search filter
    if (pubSearchValue && pubSearchValue.trim() !== "") {
      const searchText = pubSearchValue.toLowerCase();

      filteredStudents = filteredStudents.filter(paper =>
        Object.keys(paper).some(key =>
          String(paper[key]).toLowerCase().includes(searchText)
        )
      );
    }

    // Pagination
    const startIndex = currentPage * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    // Fill empty slots for UI consistency
    while (paginatedStudents.length < studentsPerPage) {
      paginatedStudents.push(null);
    }

    return paginatedStudents;
  }

  getPaginatedPaperDetails() {
    const { s_query, currentPaperType } = this.state;
    let filteredStudents = paginatedPaper;


    // check if all paper have "Paper Type" field and the papers where Paper Type is not present or empty make it "Publications"

    paginatedPaper.forEach(paper => {
      if (!paper.hasOwnProperty('Paper Type') || paper['Paper Type'] === '') {
        paper['Paper Type'] = 'Publications';
      }
    });

    // filter based on paper type now
    filteredStudents = paginatedPaper.filter(paper => paper['Paper Type'] === currentPaperType);

    // in any field if the content is "nan" then make it empty
    filteredStudents.forEach(paper => {
      for (var key in paper) {
        if (paper[key] === 'nan') {
          paper[key] = '';
        }
      }
    });

    filteredStudents.forEach(paper => {
      for (const key in paper) {
        // Trim the value first to avoid extra spaces affecting checks
        paper[key] = paper[key].trim();

        // Remove leading comma
        if (paper[key].startsWith(',')) {
          paper[key] = paper[key].substring(1).trim();
        }

        // Remove trailing comma
        if (paper[key].endsWith(',')) {
          paper[key] = paper[key].substring(0, paper[key].length - 1).trim();
        }
      }
    });


    if (s_query && s_query.trim() !== "") {
      filteredStudents = filteredStudents.filter(student => {
        // Check if any key in the student matches the s_query (case-insensitive)
        return Object.keys(student).some(key =>
          String(student[key]).toLowerCase().includes(s_query.toLowerCase())
        );
      });
    }

    return filteredStudents;
  }

  // Handle next and previous page
  nextPage = () => {
    const dim_paper = this.getPaginatedPaperDetails();

    if ((this.state.currentPage + 1) * this.state.studentsPerPage < dim_paper.length) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
        openIndex: null // close any open abstracts
      }));
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 0) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
        openIndex: null // close any open abstracts
      }));
    }
  };


  handleInputChangeUni = (event) => {
    this.setState({ uniVal: event.target.value });
  };

  searchPaper = (e) => {
    var searchTerm = e.target.value;  // Get the value from the input field

    searchTerm = searchTerm.toLowerCase();  // Convert the search term to lowercase

    this.setState({ s_query: searchTerm, currentPage: 0 });  // Update the search query state
  };

  toggleAccordion = (index) => {
    this.setState((prevState) => {
      const expandedIndexes = [...prevState.expandedIndexes];
      if (expandedIndexes.includes(index)) {
        // Collapse the accordion if it's already expanded
        const newExpandedIndexes = expandedIndexes.filter((i) => i !== index);
        return { expandedIndexes: newExpandedIndexes };
      } else {
        // Expand the accordion
        expandedIndexes.push(index);
        return { expandedIndexes };
      }
    });
  };

  getPublishDate = (date) => {
    // check if data is only year like 2011, 2012 etc then return as it is
    if (date.includes('.')) {
      date = date.split('.')[0];
    }

    if (date.length === 4) {
      return date;
    }

    // else check if it is a valid date format
    var d = new Date(date);
    if (d instanceof Date && !isNaN(d)) {
      // return as September 19, 2023 also handel if it is January 1, 2023 make it January 01, 2023
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
    }
  }


  // ✅ category handler (arrow fn = auto bind)
  setCategory = (category) => {
    this.setState({
      activeCategory: category,
      currentPage2: 0
    });
  };


  getPaginatedCF() {
    const { currentPage2, conferencePerPage } = this.state;
    const filtered = this.getPaginatedCFDetails();
    const start = currentPage2 * conferencePerPage;
    const end = start + conferencePerPage;
    return filtered.slice(start, end);
  }



  getPaginatedCFDetails() {
    const { conferenceSearchValue } = this.state;
    let filtered = [...conferenceList];
    // 🔍 SEARCH LOGIC
    if (conferenceSearchValue && conferenceSearchValue.trim() !== "") {
      const searchText = conferenceSearchValue.toLowerCase();
      filtered = filtered.filter(item =>
        Object.keys(item).some(key =>
          String(item[key]).toLowerCase().includes(searchText)
        )
      );
    }
    return filtered;
  }


  // Handle next and previous page
  nextPageCF = () => {
    var dim_paper = this.getPaginatedCFDetails();
    if ((this.state.currentPage2 + 1) * this.state.conferencePerPage < dim_paper.length) {
      this.setState((prevState) => ({ currentPage2: prevState.currentPage2 + 1 }));
    }
  };

  prevPageCF = () => {
    if (this.state.currentPage2 > 0) {
      this.setState((prevState) => ({ currentPage2: prevState.currentPage2 - 1 }));
    }
  };


  getPaginatedTeachingMaterials() {
    const {
      teachingSearchValue,
      currentPageTM,
      teachingPerPage
    } = this.state;

    let filteredMaterials = teachingList.map(mat => {
      const cleaned = { ...mat };

      // Clean string values safely
      for (const key in cleaned) {
        if (cleaned[key] === "nan") {
          cleaned[key] = "";
        }

        if (typeof cleaned[key] === "string") {
          cleaned[key] = cleaned[key].trim();

          if (cleaned[key].startsWith(",")) {
            cleaned[key] = cleaned[key].substring(1).trim();
          }

          if (cleaned[key].endsWith(",")) {
            cleaned[key] = cleaned[key]
              .substring(0, cleaned[key].length - 1)
              .trim();
          }
        }
      }

      return cleaned;
    });

    // 🔍 SEARCH LOGIC (CONNECTED PROPERLY)
    if (teachingSearchValue && teachingSearchValue.trim() !== "") {
      const searchText = teachingSearchValue.toLowerCase();

      filteredMaterials = filteredMaterials.filter(material =>
        Object.keys(material).some(key => {
          const value = material[key];

          // string fields
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchText);
          }

          // ratings array
          if (Array.isArray(value)) {
            return value.some(r =>
              String(r.rating).toLowerCase().includes(searchText) ||
              String(r.year).includes(searchText)
            );
          }

          return false;
        })
      );
    }

    // Pagination (shift mechanism)
    const shiftAmount = teachingPerPage - 1;
    const startIndex = currentPageTM * shiftAmount;
    const endIndex = startIndex + teachingPerPage;

    return filteredMaterials.slice(startIndex, endIndex);
  }




  // Get filtered materials count
  getFilteredTeachingMaterialsCount() {
    const { s_query, allTeachingMaterials } = this.state;
    let filteredMaterials = allTeachingMaterials;

    // Replace "nan" with empty string
    filteredMaterials.forEach(mat => {
      for (var key in mat) {
        if (mat[key] === 'nan') {
          mat[key] = '';
        }
      }
    });

    // Trim & remove leading/trailing commas
    filteredMaterials.forEach(mat => {
      for (const key in mat) {
        mat[key] = String(mat[key]).trim();
        if (mat[key].startsWith(',')) {
          mat[key] = mat[key].substring(1).trim();
        }
        if (mat[key].endsWith(',')) {
          mat[key] = mat[key].substring(0, mat[key].length - 1).trim();
        }
      }
    });

    // Search/filter logic
    if (s_query && s_query.trim() !== "") {
      filteredMaterials = filteredMaterials.filter(material => {
        return Object.keys(material).some(key =>
          String(material[key]).toLowerCase().includes(s_query.toLowerCase())
        );
      });
    }

    return filteredMaterials.length;
  }

  // Next page handler with overlapping logic
  nextPageTM = () => {
    const totalFilteredCount = this.getFilteredTeachingMaterialsCount();
    const shiftAmount = this.state.teachingPerPage - 1;
    const nextStartIndex = (this.state.currentPageTM + 1) * shiftAmount;

    // Check if there are enough items for the next page
    if (nextStartIndex < totalFilteredCount) {
      this.setState(prevState => ({
        currentPageTM: prevState.currentPageTM + 1
      }));
    }
  };

  // Previous page handler
  prevPageTM = () => {
    if (this.state.currentPageTM > 0) {
      this.setState(prevState => ({
        currentPageTM: prevState.currentPageTM - 1
      }));
    }
  };



  awardFinder = () => {
    const { currentPos2, screenWidth } = this.state;

    const books = awardsList;
    const currentPos = currentPos2 - 1;

    // Decide how many items to show
    const itemsToShow = screenWidth <= 768 ? 5 : 3;
    // mobile 5 items, desktop 3 items
    console.log('itemsToShow', itemsToShow);

    const result = [];

    for (let i = 0; i < itemsToShow; i++) {
      const pos = currentPos + i;
      if (pos >= 0 && pos < books.length) {
        result.push(books[pos]);
      }
    }

    return result;
  };

  // Four box awards example
  //   awardFinder = () => {
  //   const { allAwards, currentPos2 } = this.state;

  //   const books = allAwards;
  //   const currentPos = currentPos2 - 1;
  //   const nextPos = currentPos + 1;
  //   const trdPos = currentPos + 2;
  //   const fourthPos = currentPos + 3; // NEW

  //   const validBooks = [];

  //   if (currentPos >= 0 && currentPos < books.length) validBooks.push(books[currentPos]);
  //   if (nextPos >= 0 && nextPos < books.length) validBooks.push(books[nextPos]);
  //   if (trdPos >= 0 && trdPos < books.length) validBooks.push(books[trdPos]);
  //   if (fourthPos >= 0 && fourthPos < books.length) validBooks.push(books[fourthPos]); // NEW

  //   return validBooks;
  // };


  togglePublication = (index) => {
    this.setState({
      openIndex: this.state.openIndex === index ? null : index
    });
  };


  // publications
  toggleDropdown = () => {
    this.setState({ open: !this.state.open });
  };
  selectOption = (option) => {
    this.setState({ selected: option, open: false });
  };
  toggleInput = () => {
    this.setState({ inputOpen: !this.state.inputOpen });
  };

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  // Teaching
  toggleTeachingDropdown = () => {
    this.setState({ teachingOpen: !this.state.teachingOpen });
  };
  teachingSelectOption = (option) => {
    this.setState({ teachingSelected: option, teachingOpen: false });
  };
  toggleTeachingInput = () => {
    this.setState({ teachingInputOpen: !this.state.teachingInputOpen });
  };
  handlePublicationChange = (e) => {
    this.setState({
      pubSearchValue: e.target.value,
      currentPage: 0 // reset page on search
    });
  };

  handleTeachingChange = (e) => {
    this.setState({
      teachingSearchValue: e.target.value,
      currentPage: 0 // reset page on search
    });
  };

  // Conference
  toggleConferenceDropdown = () => {
    this.setState({ conferenceOpen: !this.state.conferenceOpen });
  };
  conferenceSelectOption = (option) => {
    this.setState({ conferenceSelected: option, conferenceOpen: false });
  };
  toggleConferenceInput = () => {
    this.setState({ conferenceInputOpen: !this.state.conferenceInputOpen });
  };
  handleConferenceChange = (e) => {
    this.setState({
      conferenceSearchValue: e.target.value,
      currentPage2: 0
    });
  };


  // toggle sidebar
  openSidebar = () => {
    this.setState({ sidebarOpen: true });
  };

  closeSidebar = () => {
    this.setState({ sidebarOpen: false });
  };

  handleResize = () => {
    this.setState({
      screenWidth: document.documentElement.clientWidth
    });
  };




  // new next button for scroll
  prevPageScroll = () => {
    const { currentPage, studentsPerPage, allPapers } = this.state;

    if (currentPage === 1) return;

    const newPage = currentPage - 1;
    const end = newPage * studentsPerPage;

    const newVisible = allPapers.slice(0, end);

    this.setState({
      visiblePapers: newVisible,
      currentPage: newPage
    });
  };

  nextPageScroll = () => {
    const { currentPage, studentsPerPage, allPapers } = this.state;

    const totalPages = Math.ceil(allPapers.length / studentsPerPage);
    if (currentPage >= totalPages) return;

    const newPage = currentPage + 1;
    const end = newPage * studentsPerPage;

    const newVisible = allPapers.slice(0, end);

    this.setState({
      visiblePapers: newVisible,
      currentPage: newPage
    });
  };

  // about collapse

  toggleExpand = () => {
    const fullHeight = this.boxRef.current.scrollHeight;

    this.setState((prev) => ({
      expanded: !prev.expanded,
      height: prev.expanded ? 300 : fullHeight
    }));
  };


  render() {
    const options = ["Title", "Authors", "Journal", "Publishing Year", "Citations"];
    const { open, selected } = this.state;
    const { teachingOpen, teachingSelected } = this.state;
    const { conferenceOpen, conferenceSelected } = this.state;
    const { inputOpen, pubSearchValue } = this.state;
    const { teachingInputOpen, teachingSearchValue } = this.state;
    const { conferenceInputOpen, conferenceSearchValue } = this.state;

    const paginatedMaterials = this.getPaginatedTeachingMaterials();
    const paginatedConference = this.getPaginatedCF(conferenceList);
    // if (this.state.selectedCategory !== "All") {
    //   filteredMaterials = paginatedMaterials.filter(
    //     (mat) => mat.category === this.state.selectedCategory
    //   );
    // }
    const totalFilteredCount = this.getFilteredTeachingMaterialsCount();
    const totalPages = Math.ceil(totalFilteredCount / this.state.teachingPerPage);


    $(document).ready(function () {
    });
    return (
      <div className="website">

        <nav>
          <div className="container d-flex justify-content-between align-items-center">
            <div className="nav-left">
              {/* <div className="logo">Atif Ellahie</div> */}
            </div>

            {/* Desktop links */}
            <ul className="nav-links">
              <li><a href="#about">About</a></li>
              <li><a href="#publications">Publications</a></li>
              <li><a href="#teaching">Teaching</a></li>
              <li><a href="#conferences">Conferences</a></li>
              <li><button onClick={() => {
                const filePath = "/Atif-Ellahie-CV.pdf"; // your file path

                // Open in new tab
                window.open(filePath, "_blank");

                // Trigger download
                const link = document.createElement("a");
                link.href = filePath;
                link.download = "Atif-Ellahie-CV.pdf"; // file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>CV</button></li>
              <div className="contact-links" onClick={() => { $('.contactMe').css('display', 'flex') }}>
                <button >Contact</button>
              </div>
            </ul>

            {/* Mobile toggle */}
            <button className="menu-toggle" onClick={this.openSidebar}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>


        </nav>

        {/* Mobile Sidebar */}
        <div className={`mobile-sidebar ${this.state.sidebarOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={this.closeSidebar}><i className="fa-solid fa-xmark"></i></button>

          <ul className="mobile-nav-links">
            <li><a onClick={this.closeSidebar} href="#about">About</a></li>
            <li><a onClick={this.closeSidebar} href="#publications">Publications</a></li>
            <li><a onClick={this.closeSidebar} href="#teaching">Teaching</a></li>
            <li><a onClick={this.closeSidebar} href="#conferences">Conferences</a></li>
            <li><a onClick={this.closeSidebar} href="#cv">CV</a></li>
            <li><a onClick={this.closeSidebar} href="#about">Contact</a></li>
          </ul>
        </div>


        <div className="container userInfo">

          <div className="left-content">
            <div>
              <h1>Atif Ellahie</h1>
              <p className="subtitle">Associate Professor of Accounting</p>
              <div className="affiliation">
                <p>David Eccles School of Business, University of Utah</p>
                <p>Director, Accounting Ph.D. Program.</p>
              </div>

              <div className="button-group">
                <a href="#about" className="btn btn-about">About me</a>
                <a href="#publications" className="btn btn-research">View research</a>
              </div>
            </div>

            <div className="contact-section">
              {/* <h3>Contact</h3>
              <a href="mailto:atif.ellahie@eccles.utah.edu" className="email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7L13.03 12.7C12.4 13.1 11.6 13.1 10.97 12.7L2 7" />
                </svg>
                atif.ellahie@eccles.utah.edu
              </a> */}

              <div className="social-icons largeSocial">
                <Link target='_blank' to="https://scholar.google.com/citations?user=b90kdvoAAAAJ&hl=en" className="social-icon"><img src="/Assets/dark_scholar.svg" alt="facebook" /></Link>
                <Link target='_blank' to="https://x.com/atifellahie" className="social-icon"><img src="/Assets/dark_x.svg" alt="facebook" /></Link>
                <Link target='_blank' to="https://www.linkedin.com/in/atifellahie/" className="social-icon"><img src="/Assets/dark_in.svg" alt="facebook" /></Link>
                <Link target='_blank' to="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=1656321" className="social-icon"><img src="/Assets/dark_ssrn.svg" alt="facebook" /></Link>
                <Link target='_blank' to="https://orcid.org/0000-0002-5241-8578" className="social-icon"><img src="/Assets/dark_id.svg" alt="facebook" /></Link>
              </div>
            </div>
          </div>

          <div className="right-image">
            <img src="/Assets/Man.png" alt="Atif Ellahie" />
          </div>
          <div className="social-icons smallSocial">
            <Link target='_blank' to="https://scholar.google.com/citations?user=b90kdvoAAAAJ&hl=en" className="social-icon"><img src="/Assets/dark_scholar.svg" alt="facebook" /></Link>
            <Link target='_blank' to="https://x.com/atifellahie" className="social-icon"><img src="/Assets/dark_x.svg" alt="facebook" /></Link>
            <Link target='_blank' to="https://www.linkedin.com/in/atifellahie/" className="social-icon"><img src="/Assets/dark_in.svg" alt="facebook" /></Link>
            <Link target='_blank' to="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=1656321" className="social-icon"><img src="/Assets/dark_ssrn.svg" alt="facebook" /></Link>
            <Link target='_blank' to="https://orcid.org/0000-0002-5241-8578" className="social-icon"><img src="/Assets/dark_id.svg" alt="facebook" /></Link>
          </div>
        </div>

        {/* About section */}
        <div id="about" className='aboutSection'>
          <div className="container aboutBox">

            <div className="profile-photo"></div>

            <div className="content aboutContent" ref={this.boxRef} style={{
              height: this.state.height,
              overflow: 'hidden',
              transition: "height 0.5s ease"
            }}>
              <div className="section">
                <div className="timeline-section">
                  <div className="timeline-dots"></div>
                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Academic<br />Focus</div>
                </div>
                <div className='aboutContent'>
                  <h1>About Me</h1>
                  <p>Associate Professor, David Eccles School of Business, The University of Utah</p>
                  <p>I am an Associate Professor at the David Eccles School of Business at The University of Utah . I teach graduate-level courses on business valuation and analysis, and mergers and acquisitions, as well as executive-level courses in accounting and finance. My teaching has received the Kenneth J. Hanni Teaching Award and the Brady Faculty Superior Teaching Award. My research focuses on two primary areas at the intersection of financial economics and accounting:</p>
                </div>
              </div>

              <div className="section">
                <div className="timeline-section">
                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Research<br />Focus</div>
                </div>
                <div className='aboutContent'>
                  <h2>Academic Focus</h2>
                  <p>Asset pricing  •  Disclosure  •  M&A  •  Compensation</p>

                </div>
              </div>

              <div className="section">
                <div className="timeline-section">

                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Education & <br /> Credentials</div>
                </div>
                <div className='aboutContent'>
                  <h2 >Research Focus</h2>
                  <div className="research-items">
                    <div className="research-item">
                      Examining 'risk' by incorporating the interaction of firm-level and macroeconomic information (e.g., earnings beta, volatility forecasting, growth risk).
                    </div>
                    <div className="research-item">
                      Examining how firms and individuals respond to their institutional environment (e.g., <a href="#">disclosure</a>, <a href="#">institutional quality</a>, <a href="#">culture</a>, <a href="#">policy intervention</a>).
                    </div>
                  </div>

                </div>
              </div>

              <div className="section">
                <div className="timeline-section">

                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Professional <br />Experience</div>
                </div>
                <div className='aboutContent'>
                  <h2>Education & Credentials</h2>
                  <p>I earned a PhD from London Business School, an MSc in International Accounting and Finance (with distinction) from London School of Economics, and an MBA from Lahore University of Management Sciences. I have also held the professional designation of Chartered Financial Analyst since 2003.</p>
                </div>
              </div>

              <div className="section">
                <div className="timeline-section">

                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-label">Personal <br />Interests</div>
                </div>
                <div className='aboutContent'>
                  <h2>Professional Experience</h2>
                  <p>Prior to academia, I worked for ten years (1999-2009) in investment banking in New York and London. Most recently, I was an Executive Director at UBS Investment Bank advising technology, software, and services companies on corporate finance strategy, capital raisings, and mergers and acquisitions. My clients included IBM, Xerox, Motorola, Infosys and BAE Systems, among others.</p>
                </div>
              </div>

              <div className="section">
                <div className="timeline-section">
                  <div className="timeline-line"></div>
                  <div className="timeline-dot"></div>
                  {/* <div className="timeline-label">Academic<br />Focus</div> */}
                </div>
                <div className='aboutContent'>
                  <h2>Personal Interests</h2>
                  <p>In my free time, I enjoy traveling with family, cooking, cricket, cars, and long walks.</p>
                </div>
              </div>


            </div>

            <div className='aboutBtn'>
              <button onClick={this.toggleExpand} className="readMore">{this.state.expanded ? "Read Less" : "Read More"}</button>
              <button className="download-btn">
                Download my CV <img src="/Assets/document-download.svg" alt="document-download" />
              </button>
            </div>
          </div>
        </div>


        {/* Publications  */}
        <div className="ResSection pubSection" id="publications">
          <div className='publicationsBox'>
            <div className="ResHeader container mb-0">
              <div className='lineResHip'>
                <h1 className="ResTitle">Publications and Scholarly Contributions</h1>
                <p>Contributions to research and academic discourse.</p>
              </div>

              <div className="filterBox">
                <ul>
                  {["Publications", "Working Papers", "Book Chapters"].map((type) => (
                    <li key={type}
                      onClick={() => this.setState({ currentPaperType: type, currentPage: 0, openIndex: null })}
                    >
                      <button className={this.state.currentPaperType === type ? 'active' : ''}>{type}</button>
                    </li>
                  ))}
                </ul>
                <div className='searchFilter'>
                  <div className="input-container open mobileInput">
                    <input
                      type="text"
                      placeholder="Search"
                      value={teachingSearchValue}
                      onChange={this.handlePublicationChange}
                    />
                    <i onClick={this.toggleTeachingInput} className="fa-solid fa-xmark"></i>
                  </div>
                  <div className="toggle-input-wrapper">
                    <button className={`toggle-btn  ${inputOpen ? "open" : ""}`} onClick={this.toggleInput}>
                      <img src="/Assets/search-normal.svg" alt="search" />
                    </button>
                  </div>
                  <div className={`custom-dropdown ${open ? "open" : ""}`}>
                    <button className="dropdown-btn" onClick={this.toggleDropdown}>
                      {selected ? selected : <img src="/Assets/Filter.svg" alt="search" />}
                    </button>
                    <ul className="dropdown-menu">
                      {options.map((opt, index) => (
                        <li key={index} onClick={() => this.selectOption(opt)}>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
            <div className={`input-container  container ${inputOpen ? "open" : ""}`}>
              <input
                type="text"
                placeholder="Search"
                value={pubSearchValue}
                onChange={this.handlePublicationChange}
              />
              <i onClick={this.toggleInput} className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className='publicationsWrapper container'>
            <div id="publicationsBox" className="PublicationsList  scrollBox">
              {this.getPaginatedPaper().length > 0 ? (
                this.getPaginatedPaper().map((Paper, index) => (
                  Paper ? (
                    <div data-title={Paper.Title} data-type={Paper.type} id="Paper"
                      className={
                        this.state.openIndex === index ? "enclosePublicAdd" : "enclosePublic"
                      }
                      key={index}
                    >
                      <div className="PublicationItem ">
                        <div className="PubContent">
                          <div>
                            <div className="title">
                              {Paper["Paper Link"] ? (
                                <a href={Paper["Paper Link"]} target="_blank" className="title">
                                  {Paper.Title}
                                </a>
                              ) : (
                                <span className="title">{Paper.Title}</span>
                              )}

                            </div>
                            <div className="PubJournal">
                              {Paper.Conference || Paper.Journal ? (
                                <div>
                                  {Paper.Conference && Paper.Conference !== "nan" ? (
                                    <a href={Paper.Conference} target="_blank">{Paper.Journal || "See Journal/Conference"}</a>
                                  ) : (
                                    <span>{Paper.Journal}</span>
                                  )}
                                  {Paper["Publishing Year"] && <span>, {this.getPublishDate(Paper["Publishing Year"])}</span>}
                                </div>
                              ) : null}

                            </div>
                            {Paper.Authors && <div className="author">{Paper.Authors}</div>}
                          </div>
                          <div className='d-flex flex-column align-items-end'>
                            {Paper["Publishing Year"] && <div className="date">{this.getPublishDate(Paper["Publishing Year"])}</div>}
                            <div className='journalCarousel mt-1' onClick={() => this.togglePublication(index)}>
                              {this.state.openIndex === index && (<i className="fa-solid fa-chevron-up"></i>)}
                              {this.state.openIndex !== index && (<i className="fa-solid fa-chevron-down"></i>)}
                            </div>
                          </div>


                        </div>
                        {Paper.Abstract && this.state.openIndex === index && (
                          <div className='publicationContent'>
                            <p>{Paper.Abstract}</p>
                          </div>
                        )}

                      </div>
                    </div>
                  ) : null
                ))
              ) : (
                <div className="noPapers">No papers found.</div>
              )}

            </div>
          </div>
        </div>

        {
          Math.ceil(this.getPaginatedPaperDetails().length / this.state.studentsPerPage) !== 1 ?
            <div className="conferencePagination">
              <div className='paginationBackground'>
                <button className="btn-back" onClick={this.prevPage} disabled={this.state.currentPage === 0}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="pageNumber">
                  <span>{this.state.currentPage + 1}</span> <span>of</span> <span>{Math.ceil(this.getPaginatedPaperDetails().length / this.state.studentsPerPage)}</span>
                </div>
                <button className="btn-back"
                  onClick={this.nextPage}
                  disabled={(this.state.currentPage + 1) * this.state.studentsPerPage >= this.state.allPapers.length}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
            : null
        }

        <div className="teaching-section" id="teaching">
          <div className='publicationsBox mb-0'>
            <div className="teaching-header container conferenceFilter">

              <div className='lineResHip'>
                <h1 className="ResTitle">Teaching Initiatives</h1>
                <p>Educational activities and courses</p>
              </div>
              <div className='filterBox'>
                <ul>
                  <li><button className={this.state.selectedCategory === "All" ? "active" : ""}
                    onClick={() => this.handleCategoryFilter("All")}>All</button></li>
                  <li><button data-title="Teaching Initiatives" data-type="MAcc/MSF/MBA/PMBA" id="Teaching" className={this.state.selectedCategory === "MAcc/MSF/MBA/PMBA" ? "active" : ""}
                    onClick={() => this.handleCategoryFilter("MAcc/MSF/MBA/PMBA")}>MAcc/MSF/MBA/PMBA</button></li>
                  <li><button data-title="Teaching Initiatives" data-type="Undergraduate" id="Teaching" className={this.state.selectedCategory === "Undergraduate" ? "active" : ""}
                    onClick={() => this.handleCategoryFilter("Undergraduate")}>Undergraduate</button></li>
                  <li><button data-title="Teaching Initiatives" data-type="Executive Education" id="Teaching" className={this.state.selectedCategory === "Executive Education" ? "active" : ""}
                    onClick={() => this.handleCategoryFilter("Executive Education")}>Executive Education</button></li>
                  <li><button data-title="Teaching Initiatives" data-type="PhD" id="Teaching" className={this.state.selectedCategory === "PhD" ? "active" : ""}
                    onClick={() => this.handleCategoryFilter("PhD")}>PhD</button></li>
                </ul>
                <div className='searchFilter'>
                  <div className="input-container open mobileInput">
                    <input
                      type="text"
                      placeholder="Search"
                      value={teachingSearchValue}
                      onChange={this.handleTeachingChange}
                    />
                    <i onClick={this.toggleTeachingInput} className="fa-solid fa-xmark"></i>
                  </div>
                  <div className="toggle-input-wrapper">
                    <button className={`toggle-btn  ${teachingInputOpen ? "open" : ""}`} onClick={this.toggleTeachingInput}>
                      <img src="/Assets/search-normal.svg" alt="search" />
                      {/* <i className="fa-solid fa-search"></i> */}
                    </button>
                  </div>
                  <div className={`custom-dropdown ${teachingOpen ? "open" : ""}`}>
                    <button className="dropdown-btn" onClick={this.toggleTeachingDropdown}>
                      {teachingSelected ? teachingSelected : <img src="/Assets/Filter.svg" alt="search" />}
                    </button>
                    <ul className="dropdown-menu">
                      {options.map((opt, index) => (
                        <li key={index} onClick={() => this.teachingSelectOption(opt)}>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div className={`input-container   container ${teachingInputOpen ? "open mb-5" : ""}`}>
              <input
                type="text"
                placeholder="Search"
                value={teachingSearchValue}
                onChange={this.handleTeachingChange}
              />
              <i onClick={this.toggleTeachingInput} className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className='teachingWrapper'>


            <div className=' teachingSection scroll-transparent '>
              <div className='courseCarousel container'>
                {paginatedMaterials.filter(item =>
                  this.state.selectedCategory === "All" || item.category === this.state.selectedCategory
                ).map((material, index) => {
                  if (material) {
                    return (
                      <div key={index} className='activityCourse'>
                        <div className='courseNumber'>
                          <h5>{index + 1}</h5>
                          <p> {material.title.split(" ")[0]} <br />
                            {material.title.split(" ").slice(1).join(" ")}</p>
                        </div>
                        <div className='courseBox'>
                          <div className='courseHeading'>
                            <p>{material.category}</p>
                            <p>{material.years}</p>
                          </div>
                          <div className='courseHeading'>
                            <p>{material.university}</p>
                          </div>
                          {Array.isArray(material.ratings) && material.ratings.length > 0 && (
                            <div className='courseContent'>
                              <p>Average instructor rating</p>
                            </div>
                          )}
                          <div className='courseRating'>
                            <ul>
                              {Array.isArray(material.ratings) &&
                                material.ratings.map((rate, i) => (
                                  <li key={i}>{rate.rating} ({rate.year})</li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="materialItem placeholder" style={{ visibility: 'hidden' }}>
                        {/* Empty placeholder for consistent layout */}
                      </div>
                    );
                  }
                })}

                {totalFilteredCount === 0 && (
                  <div className="noResults">No teaching materials found</div>
                )}

              </div>
            </div>
          </div>




          {/*   <div className="course-tabs container">
            {this.state.allTeachingMaterials.map((cls, index) => (
              <div className={"course-tab " + (this.state.currentTeachingTitle === cls.Title ? "active" : "")} onClick={() => this.setState({ currentTeachingTitle: cls.Title, currentTeachingCls: cls.Course })} key={index}>
                Course {index + 1}
              </div>
            ))}
          </div>

         <div className="course-card container">
            <div className="card-header">
              <div className="course-name">{this.state.currentTeachingTitle}</div>
            </div>
            <div className="card-description">
              {this.state.currentTeachingCls}
            </div>
          </div> */}

        </div>

        <div className="ResSection container conferences" id="conferences">
          <div className='publicationsBox'>
            <div className="ResHeader ">
              <div className="teaching-header  conferenceFilter mb-0">
                <div className='lineResHip'>
                  <h1 className="ResTitle">Conferences</h1>
                  <p>Academic conferences and presentations</p>
                </div>
                <div className='filterBox'>
                  <ul>
                    <li><button className={this.state.activeCategory === "All" ? "active" : ""}
                      onClick={() => this.setCategory("All")}>All</button></li>
                    <li><button className={this.state.activeCategory === "Workshop/Presentation" ? "active" : ""}
                      onClick={() => this.setCategory("Workshop/Presentation")}>Workshop/Presentation</button></li>
                    <li><button className={this.state.activeCategory === "Conference Participation" ? "active" : ""}
                      onClick={() => this.setCategory("Conference Participation")}>Conference Participation</button></li>
                  </ul>
                  <div className='searchFilter'>
                    <div className="input-container open mobileInput">
                      <input
                        type="text"
                        placeholder="Search"
                        value={conferenceSearchValue}
                        onChange={this.handleConferenceChange}
                      />
                      <i onClick={this.toggleTeachingInput} className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="toggle-input-wrapper">
                      <button className={`toggle-btn  ${conferenceInputOpen ? "open" : ""}`} onClick={this.toggleConferenceInput}>
                        <img src="/Assets/search-normal.svg" alt="search" />
                        {/* <i className="fa-solid fa-search"></i> */}
                      </button>


                    </div>
                    <div className={`custom-dropdown ${conferenceOpen ? "open" : ""}`}>
                      <button className="dropdown-btn" onClick={this.toggleConferenceDropdown}>
                        {conferenceSelected ? conferenceSelected : <img src="/Assets/Filter.svg" alt="search" />}
                      </button>
                      <ul className="dropdown-menu">
                        {options.map((opt, index) => (
                          <li key={index} onClick={() => this.conferenceSelectOption(opt)}>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`input-container  container ${conferenceInputOpen ? "open" : ""}`}>
              <input
                type="text"
                placeholder="Search"
                value={conferenceSearchValue}
                onChange={this.handleConferenceChange}
              />
              <i onClick={this.toggleConferenceInput} className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="conferenceList">
            {paginatedConference.length > 0 ? (
              paginatedConference.map((Paper, index) => (
                Paper ? (
                  <div className='enclosePublic' key={index}>
                    <div className="conferenceItem">
                      <div className="conferenceLogo">
                        <img src="/Assets/conference_icon.svg" alt="journal" />
                      </div>
                      <div className="PubContent">
                        {Paper["CRN"] && <div className="date">{Paper["CRN"]}</div>}

                        <div className="d-flex justify-content-between flex-column">
                          {Paper["Paper Link"] ? (
                            <a href={Paper["Paper Link"]} target="_blank" className="title">
                              {Paper.Title}
                            </a>
                          ) : (
                            <span className="title">{Paper.Title}</span>
                          )}
                          {Paper["Year"] && <p className='presenter'>{Paper["role"]}</p>}
                        </div>

                        <div className="author">
                          {Paper["Year"] && <span>{Paper["Year"]}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              ))
            ) : (
              <div className="noPapers">No papers found.</div>
            )}
          </div>

          {
            Math.ceil(this.getPaginatedCFDetails().length / this.state.conferencePerPage) !== 1 ?
              <div className="conferencePagination">
                <div className='paginationBackground'>
                  <button className="btn-back" onClick={this.prevPageCF} disabled={this.state.currentPage2 === 0}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  <div className="pageNumber">
                    <span>{this.state.currentPage2 + 1}</span> <span>of</span> <span>{Math.ceil(this.getPaginatedCFDetails().length / this.state.conferencePerPage)}</span>
                  </div>
                  <button className="btn-back"
                    onClick={this.nextPageCF}
                    disabled={(this.state.currentPage2 + 1) * this.state.conferencePerPage >= conferenceList.length}>
                    <i className="fa-solid fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              : null
          }
        </div>

        {
          this.state.allAwards.length > 0 ?
            <>
              <div className="ResSection awardsSection" id="conferences">
                <div className="ResHeader container">
                  <div className="teaching-header container">
                    <div className='lineResHip'>
                      <h1 className="ResTitle">Awards </h1>
                      <p>Notable awards and academic recognition.</p>
                    </div>
                  </div>
                </div>
                <div className='container maxer AwardTitle' id="awards">
                  <div className='AwardCaser'>

                    <div className='awardCase'>
                      {
                        this.awardFinder().map((award, index) => {
                          return (
                            <div className='award' key={index}>
                              <img src="/Assets/award.svg" alt="award" />
                              <div className='awardDTitle paper_link_gtm' id="Awards">{award.name}</div>
                              <div className='awardD'>
                                {award.description} ({award.date})
                              </div>
                            </div>
                          );
                        }
                        )
                      }
                    </div>

                  </div>
                  <div className='awardsItems'>
                    <div className='bookButtonCont'>
                      {(() => {
                        const { currentPos2 } = this.state;

                        const itemsPerPage = 3;
                        const totalSteps = Math.ceil(awardsList.length / itemsPerPage);

                        // currentPos2 increases by 2 → convert to page number
                        const stepNumber = Math.floor(currentPos2 / 2);

                        const progressPercent =
                          totalSteps > 1 ? (stepNumber / (totalSteps - 1)) * 100 : 0;

                        return (
                          <div className="progress-container">
                            <div
                              className="progress-fill"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        );
                      })()}

                    </div>
                    <div className='bookButtonCont'>

                      {/* LEFT BUTTON */}
                      <div
                        className='awardNav'
                        onClick={() => {
                          const totalSteps = Math.ceil(awardsList.length / 3);
                          const maxPos = totalSteps * 2;
                          let newPos = this.state.currentPos2 - 2;

                          if (newPos < 1) {
                            newPos = maxPos - 1; // go to last
                          }

                          this.setState({ currentPos2: newPos });
                        }}
                      >
                        <i className="fa-solid fa-chevron-left"></i>
                      </div>
                      {/* RIGHT BUTTON */}
                      <div
                        className='awardNav'
                        onClick={() => {
                          const totalSteps = Math.ceil(awardsList.length / 3);
                          const maxPos = totalSteps * 2;
                          let newPos = this.state.currentPos2 + 2;

                          if (newPos > maxPos - 1) {
                            newPos = 1; // go to first
                          }

                          this.setState({ currentPos2: newPos });
                        }}
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>


                </div>

              </div>
            </> : null

        }

        <div className='cvDownload' id="cv">
          <button onClick={() => {
            const filePath = "/Atif-Ellahie-CV.pdf"; // your file path

            // Open in new tab
            window.open(filePath, "_blank");

            // Trigger download
            const link = document.createElement("a");
            link.href = filePath;
            link.download = "Atif-Ellahie-CV.pdf"; // file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>Download my cv <img src="/Assets/download.svg" alt="download" /> </button>
          {/* <Link to="">
          <img src="/Assets/powered_by.svg" alt="powerd" />
          </Link> */}
        </div>

        <footer className="FooterSection">
          <div className="footerContent container">
            <div className="FooterLeft">

              <div className="FooterRight">
                <Link target='_blank' to="https://scholar.google.com/citations?user=b90kdvoAAAAJ&hl=en" className="SocialIcon"> <img src="/Assets/scholars.svg" alt="facebook" /> </Link>
                <Link target='_blank' to="https://x.com/atifellahie" className="SocialIcon"> <img src="/Assets/x.svg" alt="facebook" /> </Link>
                <Link target='_blank' to="https://www.linkedin.com/in/atifellahie/" className="SocialIcon"> <img src="/Assets/linkedin.svg" alt="facebook" /> </Link>
                <Link target='_blank' to="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=1656321" className="SocialIcon"> <img src="/Assets/ssrn.svg" alt="facebook" /> </Link>
                <Link target='_blank' to="https://orcid.org/0000-0002-5241-8578" className="SocialIcon"> <img src="/Assets/id.svg" alt="facebook" /> </Link>
              </div>
            </div>
            <div className="FooterLeft">
              <span>Copyright © Atif Ellahie - 2025</span>
            </div>

            <Link to="https://academic.blog" className='powerLink'>
              {/* <img src="/Assets/powered_by.svg" alt="powerd" /> */}
              Powered by academic.blog
            </Link>
          </div>
          {/* <div className="footerContent container">
            <p></p>
          </div> */}
        </footer>

        <div className='contactMe'>
          <div className="card">
            <div className="card-title">Atif Ellahie</div>
            <div className="card-subtitle">
              Associate Professor<br />
              David Eccles School of Business, University of Utah<br />
            </div>
            <div className="card-details">
              E-mail:   atif.ellahie@eccles.utah.edu<br />
              {
                this.state.currentProfileData.phone ?
                  <>Tel: +1 (801) 600 2522<br /></>
                  : null
              }

            </div>
            <div className='xmarkTip' onClick={() => document.querySelector('.contactMe').style.display = 'none'}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>

        <div className='aboutMore' id="aboutMore">
          <div className='xmarkTip' onClick={() => { $("#aboutMore").css("left", "100%") }}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="cardBlock"
            dangerouslySetInnerHTML={{
              __html: this.state.socialMedia.about || ""
            }} style={{ zoom: "1" }}
          >
          </div>
        </div>
      </div>
    );
  }
} 
