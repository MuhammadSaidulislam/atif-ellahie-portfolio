
import React, { useState } from 'react';
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
export const Home = () => {
  const [currentPaperType, setCurrentPaperType] = useState(teachingList[0]);
  const [currentPaperPage, setCurrentPaperPage] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentTeaching, setCurrentTeaching] = useState(0);
  const [currentCourse, setCurrentCourse] = useState(courseList[0]);
  const papersPerPage = 2; // Set how many items per page

  const totalPages = Math.ceil(paginatedPaper.length / papersPerPage);

  const togglePaper = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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


  // course list
  
  const handleTabClick = (item) => {
    setCurrentCourse(item);
  };


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

                Thomas Brooks
              </div>
              <div className="hero-description">
                is the William H. Carter Professor of Literature at the University of Cambridge. He specializes in Modern American Literature, Critical Theory, and the intersections of narrative form and cultural identity. His research explores how contemporary narratives influence and reflect shifting cultural landscapes. He also serves as the co-founder and director of the Narrative Studies Research Collective at Cambridge.
              </div>
              <div className='d-flex'>
                <div className='hero-contact'>
                  <h6>Academic Focus</h6>
                  <p>Critical Theory and Narrative Studies</p>
                  <h6>Contact </h6>
                  <p>t.brooks@cambridge.edu</p>
                  <h5>#Thomas Brooks</h5>
                  <ul className="social-icons">
                    <li><Link href="https://twitter.com" target="_blank"><img src="./Assets/facebook.svg" alt="facebook" /></Link></li>
                    <li><Link href="https://facebook.com" target="_blank"><img src="./Assets/twitter.svg" alt="facebook" /></Link></li>
                    <li><Link href="https://linkedin.com" target="_blank"><img src="./Assets/linkedin.svg" alt="facebook" /></Link></li>
                  </ul>
                </div>
                <div className='user-signature'>
                  <p>Thomas Brooks</p>
                </div>
              </div>
            </div>

          </div>
          <div className='rightContainer'>
            <img src="./Assets/hero_image.png" className='profileImage' alt="Profile" />
          </div>
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

        <div className="PublicationsList ">
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

      <div className="teaching-section" id="classes">

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
            className={`course-tab ${
              currentCourse.title === item.title ? "active" : ""
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



      <div className="ResSection" id="conferences">
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

        {/* <div className="PublicationsList conferenceBox container">
            {this.getPaginatedCF().length > 0 ? (
              this.getPaginatedCF().map((Paper, index) => (
                Paper ? (
                  <div className='enclosePublic' key={index}>
                    <div className="PublicationItem container justify-content-start">
                      <div className="ResLogo">
                        <img src="/Assets/presentation.svg" alt="journal" />
                      </div>
                      <div className="PubContent">
                        {Paper["CRN"] && <div className="date">{Paper["CRN"]}</div>}
                        <div className="title">
                          {Paper["Paper Link"] ? (
                            <a href={Paper["Paper Link"]} target="_blank" className="title">
                              {Paper.Title}
                            </a>
                          ) : (
                            <span className="title">{Paper.Title}</span>
                          )}
                        </div>
                        <div className="author">
                          {Paper["Year"] && <span>{this.getPublishDate(Paper["Year"])}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              ))
            ) : (
              <div className="noPapers">No papers found.</div>
            )}

            {
              Math.ceil(this.getPaginatedCFDetails().length / this.state.studentsPerPage) !== 1 ?
                <div className="pagination mt-5">
                  <div className="pagination-buttons">
                    <button className="btn-back" onClick={this.prevPageCF} disabled={this.state.currentPage2 === 0}>
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="page-number">
                      {this.state.currentPage2 + 1} of {Math.ceil(this.getPaginatedCFDetails().length / this.state.studentsPerPage)}
                    </div>
                    <button className="btn-back"
                      onClick={this.nextPageCF}
                      disabled={(this.state.currentPage2 + 1) * this.state.studentsPerPage >= this.state.allConfarences.length}>
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
                : null
            }
          </div> */}


      </div>
      {/* {
          this.state.allAwards.length > 0 ?
            <>
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
                  <div className='AwardCaser'>
                    <div className='awardNav' onClick={() => {
                      // get list of all .dotBtn elements and find the one with the class 'dot-active' and click the previous one if it exists otherwise click the last one
                      const dotBtns = document.querySelectorAll('.dotBtn');
                      const activeDot = document.querySelector('.dot-active');
                      if (activeDot) {
                        const prevDot = activeDot.previousElementSibling;
                        if (prevDot) {
                          prevDot.click();
                        } else {
                          dotBtns[dotBtns.length - 1].click();
                        }
                      } else {
                        dotBtns[dotBtns.length - 1].click();
                      }
                    }}>
                      <img src="./Assets/back.svg" alt="Krishna" />
                    </div>
                    <div className='awardCase'>
                      {
                        this.awardFinder().map((award, index) => {
                          return (
                            <div className='award'>
                              <div className='awardImage'>
                                {award.Year}
                              </div>
                              <div className='awardDTitle paper_link_gtm' id="Awards">{award.Title}</div>
                              <div className='awardD'>
                                {award.Course}
                              </div>
                            </div>
                          );
                        }
                        )
                      }
                    </div>
                    <div className='awardNav' onClick={() => {
                      // get list of all .dotBtn elements and find the one with the class 'dot-active' and click the next one if it exists otherwise click the first one
                      const dotBtns = document.querySelectorAll('.dotBtn');
                      const activeDot = document.querySelector('.dot-active');
                      if (activeDot) {
                        const nextDot = activeDot.nextElementSibling;
                        if (nextDot) {
                          nextDot.click();
                        } else {
                          dotBtns[0].click();
                        }
                      } else {
                        dotBtns[0].click();
                      }
                    }
                    }>
                      <img src="./Assets/next.svg" alt="Krishna" />
                    </div>
                  </div>
                  <div className='bookButtonCont'>
                    {Array.from({ length: Math.ceil(this.state.allAwards.length / 3) }, (_, index) => {
                      const dotPos = index * 2 + 1; // Generate odd numbers: 1, 3, 5, 7, ...
                      return (
                        <div
                          key={dotPos}
                          className={`dotBtn ${this.state.currentPos2 === dotPos ? 'dot-active' : ''}`}
                          onClick={() => {
                            this.setState({ currentPos2: dotPos });
                          }}
                        >
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </> : null

        } */}

      <footer className="FooterSection">
        <div className="FooterContainer">
          <div className="FooterLeft">
            <span>Copyright © Thomas Cole Davis - 2025</span>
          </div>
          <div className="FooterRight">
            <div className="SocialIcon"><i className="fa-brands fa-facebook"></i></div>
            <div className="SocialIcon"><i className="fa-brands fa-twitter"></i></div>
            <div className="SocialIcon"><i className="fa-brands fa-linkedin-in"></i></div>
          </div>
        </div>
      </footer>


    </div>
  );
}

