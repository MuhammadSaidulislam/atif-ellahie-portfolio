
import React, { useEffect, useRef, useState } from 'react';
import "./CSS/styles.css";
import "./CSS/research.css";
import "./CSS/awards.css";
import "./CSS/footer.css";
import toast, { Toaster } from 'react-hot-toast';
import 'react-tabs/style/react-tabs.css';
import 'quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// social icons

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
const courseList = [
  {
    type: "Publications",
    title: "Sample Publication Title",
    course: "Related Course (if any)",
    description: "Short description about the publication or context."
  },
  {
    type: "Working Papers",
    title: "Sample Working Paper Title",
    course: "Related Course (if any)",
    description: "Short description about the content of the working paper."
  },
  {
    type: "Cases",
    title: "Sample Case Study Title",
    course: "Course or Program where used",
    description: "Brief explanation about the case."
  },
  {
    type: "Work-in-Progress",
    title: "Sample Work-in-Progress Title",
    course: "Optional course/subject",
    description: "Description of the current development work."
  }
];
let teachingList = ["Publications", "Working Papers", "Book Chapters"]


const paginatedPaper = [
  {
    title: "Are CEOs Rewarded for Luck? Evidence from Corporate Tax Windfalls",
    publish_date: "2025",
    journal: "Journal of Finance",
    journal_title: "J. Finance",
    authors: "Andreani, M., Ellahie, A., & Shivakumar, L.",
    description: "Study examining whether CEOs are rewarded for luck arising from corporate tax windfalls.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "Measuring the Quality of Mergers and Acquisitions",
    publish_date: "2025",
    journal: "Management Science",
    journal_title: "Manage. Sci.",
    authors: "Ellahie, A., Hshieh, S., & Zhang, F.",
    description: "Framework for assessing the long-term quality and effectiveness of M&A transactions.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "Accounting for Bubbles: A Discussion of Arif and Sul (2024)",
    publish_date: "2024",
    journal: "Journal of Accounting and Economics",
    journal_title: "JAE",
    authors: "Ellahie, A.",
    description: "Invited discussion on accounting implications of market bubbles, presented at 2023 JAE Conference.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "Disclosure in Initial Coin Offerings",
    publish_date: "2024",
    journal: "The Palgrave Encyclopedia of Private Equity",
    journal_title: "",
    authors: "Ellahie, A.",
    description: "Book chapter in Palgrave Encyclopedia of Private Equity, edited by Cumming, D., Hammer, B.",
    paper_link: "",
    tag: "Book Chapters"
  },
  {
    title: "Growth Matters: Disclosure and Risk Premium",
    publish_date: "2022",
    journal: "The Accounting Review",
    journal_title: "Acc. Rev.",
    authors: "Ellahie, A., Hayes, R., & Plumlee, M.",
    description: "Investigates how disclosure growth affects risk premiums in public markets.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "The Role of Disclosure and Information Intermediaries in an Unregulated Capital Market: Evidence from Initial Coin Offerings",
    publish_date: "2022",
    journal: "Journal of Accounting Research",
    journal_title: "JAR",
    authors: "Bourveau, T., De George, E., Ellahie, A., & Macciocchi, D.",
    description: "Analysis of disclosure and information intermediary impacts in ICO markets.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "Show Me the Money! Dividend Policy in Countries with Weak Institutions",
    publish_date: "2021",
    journal: "Journal of Accounting Research",
    journal_title: "JAR",
    authors: "Ellahie, A., & Kaplan, Z.",
    description: "Explores dividend policies in countries with weak governance and institutional frameworks.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "Management Forecasts of Volatility",
    publish_date: "2021",
    journal: "Review of Accounting Studies",
    journal_title: "RAS",
    authors: "Ellahie, A., & Peng, X.",
    description: "Examines how managers forecast firms’ volatility and its impact on capital markets.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "Earnings Beta",
    publish_date: "2021",
    journal: "Review of Accounting Studies",
    journal_title: "RAS",
    authors: "Ellahie, A.",
    description: "Sole-authored paper based on PhD dissertation on how earnings respond to aggregate economic factors.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "Risky Value",
    publish_date: "2020",
    journal: "",
    journal_title: "",
    authors: "Ellahie, A., Katz, M., & Richardson, S.",
    description: "Covered in UBS Academic Research Monitor.",
    paper_link: "",
    tag: "Working Papers"
  },
  {
    title: "Information Content of Mandated Bank Stress Test Disclosures",
    publish_date: "2018",
    journal: "",
    journal_title: "",
    authors: "Ellahie, A.",
    description: "Presented at 2012 JAR/FRBNY Conference as Capital Market Consequences of EU Bank Stress Tests.",
    paper_link: "",
    tag: "Working Papers"
  },
  {
    title: "Do Common Inherited Beliefs and Values Influence CEO Pay?",
    publish_date: "2017",
    journal: "Journal of Accounting and Economics",
    journal_title: "JAE",
    authors: "Ellahie, A., Tahoun, A., & Tuna, İ.",
    description: "Investigates how inherited beliefs and values influence compensation structures for CEOs.",
    paper_link: "",
    tag: "Publications"
  },
  {
    title: "Government Purchases Reloaded: Informational Insufficiency and Heterogeneity in Fiscal VARs",
    publish_date: "2017",
    journal: "Journal of Monetary Economics",
    journal_title: "JME",
    authors: "Ellahie, A., & Ricco, G.",
    description: "Analyzes government purchases using fiscal VAR techniques, with a focus on informational heterogeneity.",
    paper_link: "",
    tag: "Publications"
  }
];



const awardsList = [
  {
    "id": 1,
    "date": "1996",
    "name": "Dean’s Honor Roll",
    "description": "Lahore University of Management Sciences"
  },
  {
    "id": 2,
    "date": "1997",
    "name": "Askari Bank Gold Medal for Best Student in Banking",
    "description": "Lahore University of Management Sciences"
  },
  {
    "id": 3,
    "date": "1997",
    "name": "Dean’s Honor Roll",
    "description": "Lahore University of Management Sciences"
  },
  {
    "id": 4,
    "date": "1999",
    "name": "Distinction Awarded for MSc Degree",
    "description": "London School of Economics"
  },
  {
    "id": 5,
    "date": "2006",
    "name": "Performance Award for Leadership in Recruiting and Training",
    "description": "UBS Investment Bank"
  },
  {
    "id": 6,
    "date": "2007",
    "name": "Performance Award for Leadership in Recruiting and Training",
    "description": "UBS Investment Bank"
  },
  {
    "id": 7,
    "date": "2010",
    "name": "PhD Program Financial Award",
    "description": "London Business School"
  },
  {
    "id": 8,
    "date": "2012",
    "name": "Best Paper Prize for Young Economists",
    "description": "Warsaw International Economic Meeting"
  },
  {
    "id": 9,
    "date": "2015",
    "name": "PhD Program Financial Award",
    "description": "London Business School"
  },
  {
    "id": 10,
    "date": "2017",
    "name": "AAA FARS Excellence in Reviewing Award",
    "description": "American Accounting Association"
  },
  {
    "id": 11,
    "date": "2018",
    "name": "H. James Griggs-FIA Fellow Award",
    "description": "University of Utah"
  },
  {
    "id": 12,
    "date": "2019",
    "name": "H. James Griggs-FIA Fellow Award",
    "description": "University of Utah"
  },
  {
    "id": 13,
    "date": "2020",
    "name": "David Eccles Emerging Scholar Award",
    "description": "University of Utah"
  },
  {
    "id": 14,
    "date": "2020",
    "name": "Kenneth J. Hanni Teaching Award",
    "description": "University of Utah"
  },
  {
    "id": 15,
    "date": "2020",
    "name": "AAA FARS Excellence in Reviewing Award",
    "description": "American Accounting Association"
  },
  {
    "id": 16,
    "date": "2021",
    "name": "David Eccles Emerging Scholar Award",
    "description": "University of Utah"
  },
  {
    "id": 17,
    "date": "2021",
    "name": "AAA FARS Excellence in Reviewing Award",
    "description": "American Accounting Association"
  },
  {
    "id": 18,
    "date": "2022",
    "name": "David Eccles Faculty Fellow Award",
    "description": "University of Utah"
  },
  {
    "id": 19,
    "date": "2023",
    "name": "Excellence in Refereeing Award",
    "description": "Journal of Accounting Research"
  },
  {
    "id": 20,
    "date": "2023",
    "name": "Daniels Fund Leadership in Ethics Education Award",
    "description": "University of Utah"
  },
  {
    "id": 21,
    "date": "2023",
    "name": "Dr. Rodney H. Brady Faculty Superior Teaching Award",
    "description": "University of Utah"
  },
  {
    "id": 22,
    "date": "2023",
    "name": "David Eccles Faculty Fellow Award",
    "description": "University of Utah"
  },
  {
    "id": 23,
    "date": "2023",
    "name": "AAA FARS Excellence in Reviewing Award",
    "description": "American Accounting Association"
  },
  {
    "id": 24,
    "date": "2024",
    "name": "Excellence in Refereeing Award",
    "description": "Journal of Accounting Research"
  },
  {
    "id": 25,
    "date": "2024",
    "name": "Top Referee Award",
    "description": "Review of Accounting Studies"
  },
  {
    "id": 26,
    "date": "2024",
    "name": "Outstanding Reviewer Award",
    "description": "The Accounting Review"
  },
  {
    "id": 27,
    "date": "2024",
    "name": "AAA FARS Outstanding Service Award",
    "description": "American Accounting Association"
  },
  {
    "id": 28,
    "date": "2024",
    "name": "David Eccles Faculty Fellow Award",
    "description": "University of Utah"
  }
];


const conferences = [
  // 2015
  { title: "LBS Accounting Symposium", date: "2015", role: "Presenter" },
  { title: "RAST Conference", date: "2015", role: "Presenter" },

  // 2016
  { title: "CAR Conference", date: "2016", role: "Presenter" },
  { title: "CARE Conference", date: "2016", role: "Presenter" },
  { title: "LBS Accounting Symposium", date: "2016", role: "Presenter" },
  { title: "Utah Winter Accounting Conference (UWAC)", date: "2016", role: "Presenter" },

  // 2017
  { title: "Contemporary Accounting Research (CAR) Conference", date: "2017", role: "Presenter" },
  { title: "Columbia Burton Conference", date: "2017", role: "Presenter" },
  { title: "LBS Accounting Symposium", date: "2017", role: "Presenter" },
  { title: "Utah Winter Accounting Conference (UWAC)", date: "2017", role: "Presenter" },

  // 2018
  { title: "LBS Accounting Symposium", date: "2018", role: "Presenter" },
  { title: "RAST Conference", date: "2018", role: "Presenter" },
  { title: "Utah Winter Accounting Conference (UWAC)", date: "2018", role: "Presenter" },
  { title: "WashU Dopuch Accounting Conference", date: "2018", role: "Presenter" },

  // 2019
  { title: "Columbia Burton Conference", date: "2019", role: "Presenter" },
  { title: "LBS Accounting Symposium", date: "2019", role: "Presenter" },
  { title: "Michigan Kapnick Conference", date: "2019", role: "Presenter" },
  { title: "Utah Winter Accounting Conference (UWAC)", date: "2019", role: "Presenter" },

  // 2020
  { title: "RAST Conference", date: "2020", role: "Virtual Presenter" },
  { title: "Utah Winter Accounting Conference (UWAC)", date: "2020", role: "Presenter" },

  // 2021
  { title: "JAR Conference", date: "2021", role: "Presenter" },
  { title: "Miami Winter Warm-up Conference", date: "2021", role: "Presenter" },
  { title: "RAST Conference", date: "2021", role: "Presenter" },

  // 2022
  { title: "Carbon Disclosures Conference (Stanford)", date: "2022", role: "Presenter" },
  { title: "LAG Conference", date: "2022", role: "Presenter" },
  { title: "LBS Accounting Symposium", date: "2022", role: "Presenter" },
  { title: "Miami Winter Warm-up Conference", date: "2022", role: "Presenter" },
  { title: "JAR Conference", date: "2022", role: "Presenter" },
  { title: "RAST Conference", date: "2022", role: "Presenter" },
  { title: "Utah Winter Accounting Conference (UWAC)", date: "2022", role: "Presenter" },

  // 2023
  { title: "Bocconi Accounting Conference", date: "2023", role: "Presenter" },
  { title: "Columbia Burton Conference", date: "2023", role: "Presenter" },
  { title: "LBS Accounting Symposium", date: "2023", role: "Presenter" },
  { title: "Michigan Kapnick Conference", date: "2023", role: "Presenter" },
  { title: "RAST Conference", date: "2023", role: "Presenter" },
  { title: "Utah Winter Accounting Conference (UWAC)", date: "2023", role: "Presenter" },
  { title: "WashU Dopuch Conference", date: "2023", role: "Presenter" },

  // 2024
  { title: "Bocconi Accounting Conference", date: "2024", role: "Presenter" },
  { title: "LBS Accounting Symposium", date: "2024", role: "Presenter" },
  { title: "Minnesota Empirical Accounting Conference", date: "2024", role: "Presenter" },
  { title: "Review of Accounting Studies Conference (RAST)", date: "2024", role: "Presenter" },

  // 2025
  { title: "INSEAD Accounting Symposium", date: "2025", role: "Presenter" },
  { title: "Kelley Accounting Research Symposium", date: "2025", role: "Scheduled" },
  { title: "LSE Economics of Accounting Conference", date: "2025", role: "Presenter" },
  { title: "NYU Big Apple Accounting Conference", date: "2025", role: "Presenter" },
  { title: "University of Illinois Young Scholars Research Symposium", date: "2025", role: "Presenter" },
  { title: "Utah Winter Accounting Conference (UWAC)", date: "2025", role: "Presenter" },
  { title: "UTD-SMU Cowtown Accounting Conference", date: "2025", role: "Scheduled" }
];

const Initiatives = [
  {
    "title": "Introduction to React",
    "description": "Learn the basics of React, including components, state, and props."
  },
  {
    "title": "Advanced JavaScript",
    "description": "Deep dive into JavaScript concepts like closures, async/await, and event loops."
  },
  {
    "title": "UI/UX Design Principles",
    "description": "Understand the fundamentals of user interface and user experience design."
  }
]



export const Home = () => {
  const [currentPaperType, setCurrentPaperType] = useState(teachingList[0]);
  const [currentPaperPage, setCurrentPaperPage] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [openInIndex, setOpenInIndex] = useState(null);
  const [currentTeaching, setCurrentTeaching] = useState(0);
  const [coursePage, setCoursePage] = useState(0);
  const [currentCourse, setCurrentCourse] = useState(courseList[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const papersPerPage = 5; // Set how many items per page
  const coursePerPage = 5;
  // const totalPages = Math.ceil(paginatedPaper.length / papersPerPage);
  const totalCourses = Math.ceil(conferences.length / coursePerPage);

  const togglePaper = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleInPaper = (index) => {
    setOpenInIndex(openInIndex === index ? null : index);
  };


  // teaching pagination
  const filteredPapers = paginatedPaper.filter(
  (paper) => paper.tag === currentPaperType
);
 const totalPages =Math.ceil(filteredPapers.length / papersPerPage) || 1;


  const paginatedPapers = filteredPapers.slice(
    currentTeaching * papersPerPage,
    currentTeaching * papersPerPage + papersPerPage
  );

  const prevPage = () => {
    if (currentTeaching > 0) setCurrentTeaching(currentTeaching - 1);
  };

  const nextPage = () => {
    if (currentTeaching < totalPages - 1) setCurrentTeaching(currentTeaching + 1);
  };

  // course pagination
  const paginatedCourses = conferences.slice(
    coursePage * coursePerPage,
    coursePage * coursePerPage + coursePerPage
  );

  const prevCoursePage = () => {
    if (coursePage > 0) setCoursePage(coursePage - 1);
  };

  const nextCoursePage = () => {
    if (coursePage < totalPages - 1) setCoursePage(coursePage + 1);
  };


  // course list

  const handleTabClick = (item) => {
    setCurrentCourse(item);
  };


  // award carousel

  const maxIndex = awardsList.length - itemsPerView;

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset currentIndex if it exceeds maxIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, currentIndex, maxIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === maxIndex ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const totalDots = maxIndex + 1;



  // roadmap
 
  const [visiblePhases, setVisiblePhases] = useState([]);
  const phaseRefs = useRef([]);

const roadmapData = [
  {
    id: 1,
    title: "Mergers & Acquisitions",
    school: "MAcc/MSF/MBA/PMBA Elective, University of Utah (2023 – Present)",
    rating: "Average instructor rating (out of 6.0): 5.7 (2023); 5.9 (2024); 5.8 (2025)."
  },
  {
    id: 2,
    title: "Business Valuation and Analysis",
    school: "MAcc/MSF/MBA/PMBA, University of Utah (2024 – Present)",
    rating: "Average instructor rating (out of 6.0): 5.2 (2024); 5.4 (2025)."
  },
  {
    id: 3,
    title: "Finance for the Non-Financial Leader",
    school: "Executive Education, University of Utah (2023 – Present)",
    rating: ""
  },
  {
    id: 4,
    title: "Accounting PhD Seminar",
    school: "University of Utah (Fall 2024)",
    rating: ""
  },
  {
    id: 5,
    title: "Business Fundamentals of Accounting",
    school: "Undergraduate, University of Utah (2021 – 2022)",
    rating: "Average instructor rating (out of 6.0): 5.4 (2021); 5.7 (2022)."
  },
  {
    id: 6,
    title: "Intermediate Accounting",
    school: "MAcc Intensive and Undergraduate, University of Utah (2018 – 2020)",
    rating: "Average instructor rating (out of 6.0): 5.7 (2018); 5.8 (2019 – 2020)."
  },
  {
    id: 7,
    title: "Financial Reporting Analysis",
    school: "MAcc/MSF/MBA, University of Utah (2015 – 2017)",
    rating: "Average instructor rating (out of 6.0): 5.3 (2015, 2016); 5.5 (2017)."
  }
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);

          if (entry.isIntersecting) {
            setVisiblePhases((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          } else {
            setVisiblePhases((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    phaseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      phaseRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="website">
      <div id="about" className='HeroSection'>
        <div className='HeroImage'></div>
        <div className='HeroContent container'>
          <div className='leftContainer'>

            <nav className="navbar">
              <Link className="about" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>About</Link>
              <Link className="research" onClick={() => document.querySelector("#research")?.scrollIntoView({ behavior: "smooth" })}>Publications</Link>
              <Link className="about" onClick={() => document.querySelector("#classes")?.scrollIntoView({ behavior: "smooth" })}>Teaching</Link>
              <Link to="/cv">CV</Link>
              <Link className="contact" >Contact</Link>
            </nav>

            <div className="navBottom">
              <div className='navButton'><i className="fa-solid fa-bars"></i> </div>
              <div className='FLoadNav'>
                <Link className="about" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>About</Link>
                <Link className="research" onClick={() => document.querySelector("#research")?.scrollIntoView({ behavior: "smooth" })}>Research</Link>
                <Link className="about" onClick={() => document.querySelector("#classes")?.scrollIntoView({ behavior: "smooth" })}>Teaching</Link>
                <Link className="conferences" onClick={() => document.querySelector("#conferences")?.scrollIntoView({ behavior: "smooth" })}>Conferences</Link>
                <Link className="contact">Contact</Link>
              </div>
            </div>
            <div className="hero-container">
              <div className="hero-name">
                Atif Ellahie
              </div>
              <div className="hero-description">
                Associate Professor of Accounting, <br /> David Eccles School of Business,The University of Utah <br />  Director, Accounting Ph.D. Program
              </div>
              <div className='userInfo'>
                <div className='hero-contact'>
                  <h6>Academic Focus</h6>
                  <p>Asset pricing, Disclosure, M&A, Compensation</p>
                  <h6>Contact </h6>
                  <p>atif.ellahie@eccles.utah.edu</p>
                  <ul className="social-icons">
                    <li><Link to="https://scholar.google.com/citations?user=b90kdvoAAAAJ&hl=en" target="_blank"><i className="fa-brands fa-google-scholar" aria-hidden="true"></i></Link></li>
                    <li><Link to="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=1656321" target="_blank"><img src="./Assets/ssrn_logo.svg" alt="facebook" /></Link></li>
                    <li><Link to="https://orcid.org/0000-0002-5241-8578" target="_blank"><img src="./Assets/ORCID_iD.svg" alt="facebook" /></Link></li>
                  <li><Link to="https://www.linkedin.com/in/atifellahie/" target="_blank"><img src="./Assets/linkedin.svg" alt="facebook" /></Link></li>
                <li><Link to="https://x.com/atifellahie" target="_blank"><img src="./Assets/twitter.svg" alt="twitter" /></Link></li>
                  </ul>
                </div>
                <div className='user-signature'>
                  <p>Atif Ellahie</p>
                </div>
              </div>
            </div>

          </div>
          <div className='rightContainer'>
            <img src="./Assets/user.jpeg" className='profileImage' alt="Profile" />
          </div>
        </div>
      </div>
      <div className='descriptionSection'>
        <div className='ResSection description'>
          <p>I am an Associate Professor at the David <Link to="">Eccles School of Business</Link> at <Link to="">The University of Utah</Link> . I teach graduate-level courses on business valuation and analysis, and mergers and acquisitions, as well as executive-level courses in accounting and finance. My teaching has received the Kenneth J. Hanni Teaching Award and the Brady Faculty Superior Teaching Award. My research focuses on two primary areas at the intersection of financial economics and accounting:</p>

          {showMore && (
            <>
              <ul>
                <li><p>1. Examining ‘risk’ by incorporating the interaction of firm-level and macroeconomic information (e.g., <Link to="">earnings beta</Link>, <Link to="">volatility forecasting</Link>, <Link to="">growth risk</Link>).</p></li>
                <li><p>2. Examining how firms and individuals respond to their institutional environment (e.g., <Link to="">disclosure</Link>, <Link to="">institutional quality</Link>, <Link to="">culture</Link>, <Link to="">policy intervention</Link>).</p></li>
              </ul>
              <p>My research has been published in several leading academic business journals, including Journal of Accounting Research, Journal of Accounting and Economics, Journal of Finance, Review of Accounting Studies, The Accounting Review, Management Science and Journal of Monetary Economics. I am an editorial board member at <Link to="">The Accounting Review</Link> and <Link to="">Review of Accounting Studies</Link>, and a frequent reviewer for other top journals in my field.</p>
              <p>I earned a PhD from <Link to="">London Business School</Link>, an MSc in International Accounting and Finance (with distinction) from <Link to="">London School of Economics</Link>, and an MBA from <Link to="">Lahore University of Management Sciences</Link>. I have also held the professional designation of <Link to="">Chartered Financial Analyst</Link> since 2003.</p>
              <p>Prior to academia, I worked for ten years (1999-2009) in investment banking in New York and London. Most recently, I was an Executive Director at <Link to="">UBS Investment Bank</Link> advising technology, software, and services companies on corporate finance strategy, capital raisings, and mergers and acquisitions. My clients included IBM, Xerox, Motorola, Infosys and BAE Systems, among others.</p>
              <p>In my free time, I enjoy traveling with family, cooking, cricket, cars, and long walks.</p>
            </>
          )}
          {/* Read More / Read Less Button */}
          <button className="read-more-btn" onClick={() => setShowMore(!showMore)}  >
            {showMore ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
      <div className="ResSection" id="research">
        <div className="ResHeader container">
          <div className='lineRes'>
            <div className="heading-title">
              <p>Publications and<br/> Scholarly Contributions</p>
            </div>
          </div>

          <div className="ResButtons">
            {teachingList.map((type) => (
              <div
                key={type}
                className={`ResButton ${currentPaperType === type ? 'page_active' : ''}`}
                onClick={() => {
                  setCurrentPaperType(type);
                  setCurrentPaperPage(0);
                }}
              >
                <div className="picon">
                  <i className={type === "Publications" ? "fa-solid fa-paperclip" : type === "Working Papers" ? "fa-solid fa-paper-plane" : "fa-solid fa-bookmark"}  ></i>
                </div>
                <div className="label">{type}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="PublicationsList">
          {paginatedPapers.length > 0 ? (
            paginatedPapers.map((Paper, index) => (
              <div className="enclosePublic" key={index}>
                <div
                  className={
                    openIndex === index
                      ? "PublicationItem container w-full active"
                      : "PublicationItem container w-full"
                  }
                >
                  <div className="d-flex align-items-center">
                    <div className="ResLogo">
                      <img
                        src={
                          openIndex === index
                            ? "/Assets/article_icon_active.svg"
                            : "/Assets/article_icon.svg"
                        }
                        alt="journal"
                      />
                    </div>

                    <div className="PubContent">
                      {Paper.publish_date && (
                        <div className="date">{Paper.publish_date}</div>
                      )}

                      <div className="title">
                        {Paper.paper_link ? (
                          <a href={Paper.paper_link} target="_blank" rel="noreferrer" className="title">
                            {Paper.title}
                          </a>
                        ) : (
                          <span className="title">{Paper.title}</span>
                        )}
                      </div>

                      <div className="PubJournal">
                        {Paper.journal && <span>{Paper.journal}</span>}
                        {Paper.publish_date && <span>, {Paper.publish_date}</span>}
                      </div>

                      {Paper.authors && <div className="author">{Paper.authors}</div>}
                    </div>
                  </div>

                  <div className="arrow-item d-flex">
                    <button onClick={() => togglePaper(index)}>
                      <img
                        src={
                          openIndex === index
                            ? "./Assets/arrow-up-circle.svg"
                            : "./Assets/arrow-down-circle.svg"
                        }
                        alt="accordion-button"
                      />
                    </button>
                  </div>
                </div>

                {openIndex === index && (
                  <div className="accordion-content container">
                    <p>{Paper.description}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="noPapers">No papers found.</div>
          )}

          {totalPages >= 1 && (
            <div className="pagination">
              <div className="pagination-buttons">
                <button className="btn-back" onClick={prevPage} disabled={currentTeaching === 0}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                {/* PAGE NUMBER BUTTONS */}
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`page-btn ${currentTeaching === index ? 'active' : ''}`}
                    onClick={() => setCurrentTeaching(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="btn-back"
                  onClick={nextPage}
                  disabled={currentTeaching === totalPages - 1}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="teachingSection" id="classes">
        <div className="teaching-header container">
          <div className='lineResHip'>
            <div className="lineRes">
              <div className="heading-title">
                <p>Teaching Initiatives</p>
              </div>
            </div>
          </div>
        </div>

        {/* roadmap */}
        <div className="roadmap-container">
          <div className="roadmap-timeline">
            <div className="timeline-path" />

            {roadmapData.map((item, index) => {
              const isVisible = visiblePhases.includes(index);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  ref={(el) => (phaseRefs.current[index] = el)}
                  data-index={index}
                  className={`phase-container ${isVisible ? 'visible' : ''}`}
                >
                  <div className={`phase-row ${isLeft ? 'left-side' : 'right-side'}`}>
                    <div className="phase-content">
                      <div  className={`phase-card ${isLeft ? 'from-left' : 'from-right'}`} >
                        <div className="card-header-map">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="phase-label">{item.school}</p>
                        </div>
                        <span className="date-badge-inline">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <div className="timeline-node">
                      {item.id}
                    </div>

                    <div className="phase-spacer">
                      <div className={`date-badge ${isLeft ? 'text-right' : 'text-left'}`}>
                        {item.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* roadmap */}

      </div>

      <div className="courseSection" id="conferences">
        <div className="ResHeader container">
          <div className="teaching-header container">
            <div className='lineResHip'>
              <div className="ResTitle">
                <div className="heading-title">
                  <p>Conferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="PublicationsList conferenceBox container">
          {paginatedCourses.length > 0 ? (
            paginatedCourses.map((conf, index) => (
              <div className='enclosePublic' key={index}>
                <div className="PublicationItem container justify-content-start">
                  <div className="ResLogo">
                    <img src="/Assets/presentation.svg" alt="conference" />
                  </div>
                  <div className="PubContent">
                    {/* date */}
                    <div className="date">{conf.date}</div>

                    {/* title */}
                    <div className="title">
                      <span className="title">{conf.title}</span>
                    </div>

                    {/* role */}
                    <div className="author">
                      <span>{conf.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="noPapers">No conferences found.</div>
          )}

          {totalCourses > 1 && (
            <div className="pagination">
              <div className="pagination-buttons">
                <button className="btn-back" onClick={prevCoursePage} disabled={coursePage === 0}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                {/* PAGE NUMBER BUTTONS */}
                {[...Array(totalCourses)].map((_, index) => (
                  <button
                    key={index}
                    className={`page-btn ${coursePage === index ? 'active' : ''}`}
                    onClick={() => setCoursePage(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="btn-back"
                  onClick={nextCoursePage}
                  disabled={coursePage === totalCourses - 1}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        <img className='curveImage' src="./Assets/curve_image.png" alt="conference" />
      </div>



      <div className="ResSection" id="conferences">
        <div className="ResHeader container">
          <div className="teaching-header container">
            <div className='lineResHip'>
              <div className="ResTitle">
                <div className="heading-title">
                  <p>Awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container maxer AwardTitle' id="awards">
          <div className="d-flex align-items-center justify-content-center carousel-bg">
            <div className="w-100" style={{ maxWidth: "1200px" }}>
              <div className="d-flex align-items-center gap-3">
                <button onClick={goToPrevious} className="carousel-btn rounded-circle">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="position-relative flex-grow-1 overflow-hidden rounded">
                  <div
                    className="d-flex transition-transform"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                  >
                    {awardsList.map((slide) => (
                      <div
                        key={slide.id}
                        className="flex-shrink-0 p-2"
                        style={{ width: `${100 / itemsPerView}%` }}
                      >
                        <div className="slide-card rounded p-4 text-center h-100 d-flex flex-column justify-content-center">
                          <div className="award-date d-flex align-items-center justify-content-center gap-1">
                            <img src="./Assets/award.svg" alt="award" />
                            <p>{slide.date}</p>
                          </div>
                          <h5>{slide.name}</h5>
                          <h6>{slide.description}</h6>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
                <button onClick={goToNext} className="carousel-btn rounded-circle">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <img className='dots_image_award' src="./Assets/dots_image.png" alt="dots" />
      </div>

      {/* <div className='initiatives'>
        <div className="initiativesList container">
          <div className="initiatives-tabs">
            <div className='lineRes'>
              <div className="heading-title">
                <p>Other <br /> Initiatives</p>
                <h6>Financial Reporting and Control (Harvard <br /> Business School MBA) -2021, 2022, 2023</h6>
              </div>
            </div>
          </div>
          <div className="initiatives-card">
            {Initiatives.length > 0 ? (
              Initiatives.map((Paper, index) => (
                <div className="initiativesPublic" key={index}>
                  <div className="initiativesItems d-flex justify-content-between align-items-center">
                    <h2 className="title">{Paper.title}</h2>
                    <div className="arrow-item d-flex">
                      <button onClick={() => toggleInPaper(index)}>
                        {openInIndex === index ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                      </button>
                    </div>
                  </div>

                  {openInIndex === index && (
                    <div className="initiativesContent">
                      <p>{Paper.description}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="noPapers">No papers found.</div>
            )}
          </div>
        </div>
        <img className='dots_image' src="./Assets/dots_image.png" alt="dots" />
      </div> */}

      <footer className="FooterSection">
        <div className="FooterContainer">
          <div className="FooterLeft">
            <span>Copyright © Thomas Cole Davis - 2025</span>
          </div>
          <div className="FooterRight">
            <div className="SocialIcon"><i className="fa-brands fa-facebook"></i></div>
            <div className="SocialIcon"><i className="fa-brands fa-twitter"></i></div>
            <div className="SocialIcon"><i className="fa-brands fa-linkedin-in"></i></div>
            <div className="SocialIcon"><i className="fa-brands fa-youtube"></i></div>
          </div>
        </div>
      </footer>


    </div>
  );
}

