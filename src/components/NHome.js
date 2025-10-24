
import React, { useEffect, useState } from 'react';
import "./CSS/styles.css";
import "./CSS/research.css";
import "./CSS/awards.css";
import "./CSS/footer.css";
import toast, { Toaster } from 'react-hot-toast';
import 'react-tabs/style/react-tabs.css';
import 'quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

// social icons


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
let teachingList = ["Publications", "Working Papers", "Cases", "Work-in-Progress", "Book Chapters", "Other Publications", "Practitioner Articles"]
const paginatedPaper = [
  {
    title: "Artificial Intelligence in Healthcare: Challenges and Opportunities",
    publish_date: "2023-06-15",
    journal: "International Journal of Medical Informatics",
    journal_title: "Int. J. Med. Inform.",
    journal_image: "/assets/journals/ijmi.png",
    authors: "Dr. John Doe, Dr. Jane Smith",
    description: "This paper explores the application of artificial intelligence in healthcare decision-making, diagnostics, and patient outcome predictions, while highlighting the challenges of ethics, data privacy, and system reliability.",
    paper_link: "https://example.com/ai-healthcare"
  },
  {
    title: "Blockchain for Secure Academic Credential Verification",
    publish_date: "2022-12-05",
    journal: "IEEE Access",
    journal_title: "IEEE Access",
    journal_image: "/assets/journals/ieee-access.png",
    authors: "Dr. Rahul Kumar, Prof. Emily Brown",
    description: "This study proposes a blockchain-based decentralized system to verify academic credentials, drastically reducing fraud, increasing transparency, and enhancing trust between institutions.",
    paper_link: "https://example.com/blockchain-education"
  },
  {
    title: "Machine Learning Approaches to Climate Data Prediction",
    publish_date: "2021-09-22",
    journal: "Nature Climate Change",
    journal_title: "Nat. Clim. Chang.",
    journal_image: "/assets/journals/nature-climate.png",
    authors: "Dr. Sarah Johnson, Dr. Albert Green",
    description: "This publication presents hybrid deep learning models for climate prediction using satellite data and historical records, improving future climate impact forecasts.",
    paper_link: "https://example.com/climate-ml"
  }
];
const awardsList = [
  {
    "id": 1,
    "date": ["2023", "2024"],
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
    "date": ["2022", "2023", "2024"],
    "name": "David Eccles Faculty Fellow Award",
    "description": "University of Utah"
  },
  {
    "id": 8,
    "date": ["2017", "2020", "2021", "2023"],
    "name": "AAA FARS Excellence in Reviewing Award",
    "description": "American Accounting Association"
  },
  {
    "id": 9,
    "date": ["2020", "2021"],
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
    "date": ["2018", "2019"],
    "name": "H. James Griggs-FIA Fellow Award",
    "description": "University of Utah"
  },
  {
    "id": 12,
    "date": ["2010", "2015"],
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
    "date": ["2006", "2007"],
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
    "date": ["1996", "1997"],
    "name": "Dean’s Honor Roll",
    "description": "Lahore University of Management Sciences"
  }
]

const conferences = [
  { title: "International Tech Innovation Summit", date: "2025-03-15", role: "Speaker" },
  { title: "Global AI & Cloud Expo", date: "2025-05-22", role: "Attendee" },
  { title: "Next.js World Developer Conference", date: "2025-07-10", role: "Panelist" }
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
  const papersPerPage = 2; // Set how many items per page
  const coursePerPage = 2;
  const totalPages = Math.ceil(paginatedPaper.length / papersPerPage);
  const totalCourses = Math.ceil(conferences.length / coursePerPage);

  const togglePaper = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleInPaper = (index) => {
    setOpenInIndex(openInIndex === index ? null : index);
  };


  // teaching pagination
  const paginatedPapers = paginatedPaper.slice(
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
    coursePage * papersPerPage,
    coursePage * papersPerPage + papersPerPage
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
                    <li><Link to="https://x.com/atifellahie" target="_blank"><img src="./Assets/twitter.svg" alt="twitter" /></Link></li>
                    <li><Link to="https://www.linkedin.com/in/atifellahie/" target="_blank"><img src="./Assets/linkedin.svg" alt="facebook" /></Link></li>
                    <li><Link to="https://scholar.google.com/citations?user=b90kdvoAAAAJ&hl=en" target="_blank"><i class="fa-brands fa-google-scholar" aria-hidden="true"></i></Link></li>
                    <li><Link to="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=1656321" target="_blank"><img src="./Assets/ssrn_logo.svg" alt="facebook" /></Link></li>
                    <li><Link to="https://orcid.org/0000-0002-5241-8578" target="_blank"><img src="./Assets/ORCID_iD.svg" alt="facebook" /></Link></li>
                  </ul>
                </div>
                <div className='user-signature'>
                  <p>Atif Ellahie</p>
                </div>
              </div>
            </div>

          </div>
          <div className='rightContainer'>
            <img src="./Assets/hero_image.png" className='profileImage' alt="Profile" />
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
              <p>Teaching</p>
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
                    <img src="./Assets/social-you-tube.svg" alt="you-tube" />
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

          {totalPages > 1 && (
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
            <div className="ResTitle">
              <div className="heading-title">
                <p>Courses</p>
              </div>
            </div>
          </div>
        </div>

        <div className="courseList container">
          <div className="course-tabs">
            {courseList.map((item, index) => (
              <div
                className={`course-tab ${currentCourse.title === item.title ? "active" : ""
                  }`}
                onClick={() => handleTabClick(item)}
                key={index}
              >
                {item.type}
              </div>
            ))}
          </div>

          <div className="course-card">
            <div className="card-header">
              <div className="course-name">{currentCourse.title}</div>
            </div>
            <div className="card-description">
              {currentCourse.description}
            </div>
            <div className="card-download">
              <button>
                <img src="./Assets/pdf.svg" alt="pdf" /> Download Outline
              </button>
            </div>
          </div>
        </div>

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
                            {Array.isArray(slide.date)
                              ? slide.date.map((date, index) => (
                                <p key={index}>{date}</p>
                              ))
                              : <p>{slide.date}</p>
                            }
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

      <div className='initiatives'>
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
      </div>

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

