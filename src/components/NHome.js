import React, { Component } from 'react';
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

// social icons



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
var storage = getStorage(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const api = process.env.REACT_APP_API;
const video_api = process.env.REACT_APP_VIDEO_API;

let teachingList = ["Publications", "Working Papers", "Cases", "Work-in-Progress", "Book Chapters", "Other Publications", "Practitioner Articles"]

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
      studentsPerPage: 5,
      currentPaperType: 'Publications',
      expandedIndexes: [],
      currentTeachingTitle: "",
      currentTeachingCls: "",
      currentPos2: 1,
      allAwards: [],
    };
  }

  componentDidMount() {
    this.clearStateOnce("adeorrev3");
    this.loadState();
    this.loadDataForCurrentProfile(this.state.currentProfile);
  }

  clearStateOnce = (uid) => {
    var loader = localStorage.getItem('loader') || '';
    if (loader !== uid) {
      localStorage.removeItem('thisState');
      localStorage.setItem('loader', uid);
    }
  }

  loadState = () => {
    const savedState = localStorage.getItem('thisState') || {};
    if (Object.keys(savedState).length === 0) {
      return;
    }
    this.setState(JSON.parse(savedState));

    const checkProfileInterval = setInterval(() => {
      if (this.state.currentProfile !== '') {
        clearInterval(checkProfileInterval);
        this.loadDataForCurrentProfile(this.state.currentProfile);
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      const stateToSave = { ...this.state };

      // delete stateToSave.expandedIndexes;
      localStorage.setItem('thisState', JSON.stringify(stateToSave));
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
    const { s_query, currentPage, studentsPerPage, allPapers, currentPaperType } = this.state;
    let filteredStudents = allPapers;

    // check if all paper have "Paper Type" field and the papers where Paper Type is not present or empty make it "Publications"

    allPapers.forEach(paper => {
      if (!paper.hasOwnProperty('Paper Type') || paper['Paper Type'] === '') {
        paper['Paper Type'] = 'Publications';
      }
    });

    // filter based on paper type now
    filteredStudents = allPapers.filter(paper => paper['Paper Type'] === currentPaperType);

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

    // publishing year can be year or date or empty we need to sort this based on year and date if available, papers with no year/date will go at bottom

    filteredStudents.forEach(paper => {
      // check if date is like 2020.0 then make it 2020
      if (paper['Publishing Year'].includes('.')) {
        paper['Publishing Year'] = paper['Publishing Year'].split('.')[0];
      }
    });

    filteredStudents.sort((a, b) => {
      if (a['Publishing Year'] === '' && b['Publishing Year'] === '') {
        return 0;
      } else if (a['Publishing Year'] === '') {
        return 1;
      } else if (b['Publishing Year'] === '') {
        return -1;
      } else {
        return new Date(b['Publishing Year']) - new Date(a['Publishing Year']);
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

    // Now paginate the filtered students
    const startIndex = currentPage * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    // Ensure we always have `studentsPerPage` items by adding empty placeholders if needed
    while (paginatedStudents.length < studentsPerPage) {
      paginatedStudents.push(null);  // Add `null` or an empty object `{}` as placeholder
    }

    return paginatedStudents;
  }

  getPaginatedPaperDetails() {
    const { s_query, allPapers, currentPaperType } = this.state;
    let filteredStudents = allPapers;


    // check if all paper have "Paper Type" field and the papers where Paper Type is not present or empty make it "Publications"

    allPapers.forEach(paper => {
      if (!paper.hasOwnProperty('Paper Type') || paper['Paper Type'] === '') {
        paper['Paper Type'] = 'Publications';
      }
    });

    // filter based on paper type now
    filteredStudents = allPapers.filter(paper => paper['Paper Type'] === currentPaperType);

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
    var dim_paper = this.getPaginatedPaperDetails();

    if ((this.state.currentPage + 1) * this.state.studentsPerPage < dim_paper.length) {
      this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 0) {
      this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
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

  getPaginatedCF() {
    const { s_query, currentPage2, studentsPerPage, allConfarences } = this.state;
    var currentPage = currentPage2;
    let filteredStudents = allConfarences;

    // check if all paper have "Paper Type" field and the papers where Paper Type is not present or empty make it "Publications"

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

    // publishing year can be year or date or empty we need to sort this based on year and date if available, papers with no year/date will go at bottom
    filteredStudents.sort((a, b) => {
      if (a['Year'] === '' && b['Year'] === '') {
        return 0;
      } else if (a['Year'] === '') {
        return 1;
      } else if (b['Year'] === '') {
        return -1;
      } else {
        return new Date(b['Year']) - new Date(a['Year']);
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

    // Now paginate the filtered students
    const startIndex = currentPage * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    // Ensure we always have `studentsPerPage` items by adding empty placeholders if needed
    while (paginatedStudents.length < studentsPerPage) {
      paginatedStudents.push(null);  // Add `null` or an empty object `{}` as placeholder
    }

    return paginatedStudents;
  }

  getPaginatedCFDetails() {
    const { s_query, allConfarences } = this.state;
    let filteredStudents = allConfarences;

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
  nextPageCF = () => {
    var dim_paper = this.getPaginatedCFDetails();

    if ((this.state.currentPage2 + 1) * this.state.studentsPerPage < dim_paper.length) {
      this.setState((prevState) => ({ currentPage2: prevState.currentPage2 + 1 }));
    }
  };

  prevPageCF = () => {
    if (this.state.currentPage2 > 0) {
      this.setState((prevState) => ({ currentPage2: prevState.currentPage2 - 1 }));
    }
  };

  awardFinder = () => {
    const { allAwards, currentPos2 } = this.state;

    const books = allAwards;
    const currentPos = currentPos2 - 1;
    const nextPos = currentPos + 1;
    const trdPos = currentPos + 2;

    const validBooks = [];

    if (currentPos >= 0 && currentPos < books.length) {
      validBooks.push(books[currentPos]);
    }

    if (nextPos >= 0 && nextPos < books.length) {
      validBooks.push(books[nextPos]);
    }

    if (trdPos >= 0 && trdPos < books.length) {
      validBooks.push(books[trdPos]); // ✅ fixed line
    }

    return validBooks;
  };

  togglePaper = (index) => {
    this.setState({ openIndex: this.state.openIndex === index ? null : index });
  };




  render() {
    $(document).ready(function () {
    });
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
                <Link className="contact" onClick={() => { $('.contactMe').css('display', 'flex') }}>Contact</Link>
              </nav>

              <div className="navBottom">
                <div className='navButton'><i className="fa-solid fa-bars"></i> </div>

                <div className='FLoadNav'>
                  <Link className="about" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>About</Link>
                  <Link className="research" onClick={() => document.querySelector("#research")?.scrollIntoView({ behavior: "smooth" })}>Research</Link>
                  <Link className="about" onClick={() => document.querySelector("#classes")?.scrollIntoView({ behavior: "smooth" })}>Teaching</Link>
                  <Link className="conferences" onClick={() => document.querySelector("#conferences")?.scrollIntoView({ behavior: "smooth" })}>Conferences</Link>
                  <Link className="contact" onClick={() => { $('.contactMe').css('display', 'flex') }}>Contact</Link>
                </div>
              </div>

              <div className="hero-container">
                <div className="hero-name">
                  {this.state.currentProfileData.firstName} {this.state.currentProfileData.lastName}
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
              <img src={api + 'images/' + this.state.currentProfileData.logo} className='profileImage' alt="Profile" />
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
                  className={`ResButton ${this.state.currentPaperType === type ? 'page_active' : ''}`}
                  onClick={() => this.setState({ currentPaperType: type, currentPage: 0 })}
                >
                  <div className="picon">
                    <i className={type === "Publications" ? "fa-solid fa-paperclip" : type === "Working Papers" ? "fa-solid fa-paper-plane" : "fa-solid fa-bookmark"}></i>
                  </div>
                  <div className="label">{type}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="PublicationsList">
            {this.getPaginatedPaper().length > 0 ? (
              this.getPaginatedPaper().map((Paper, index) =>
                Paper ? (
                  <div className='enclosePublic' key={index}>
                    <div className={this.state.openIndex === index ? "PublicationItem container w-full active" : "PublicationItem container w-full"}>
                      <div className='d-flex align-items-center'>
                        <div className="ResLogo">
                          {this.state.openIndex === index ? <img src="/Assets/article_icon_active.svg" alt="journal" /> : <img src="/Assets/article_icon.svg" alt="journal" />}
                        </div>

                        <div className="PubContent">
                          {Paper["Publishing Year"] && <div className="date">{this.getPublishDate(Paper["Publishing Year"])}</div>}

                          <div className="title">
                            {Paper["Paper Link"] ? (
                              <a href={Paper["Paper Link"]} target="_blank" className="title">
                                {Paper.Title}
                              </a>
                            ) : (
                              <span className="title">{Paper.Title}</span>
                            )}
                            {Paper.Video && <a href={Paper.Video} target="_blank" className="ExtraRes">(Video)</a>}
                            {Paper.Slides && <a href={Paper.Slides} target="_blank" className="ExtraRes">(Slides)</a>}
                          </div>

                          <div className="PubJournal">
                            {Paper.Conference || Paper.Journal ? (
                              <>
                                {Paper.Conference && Paper.Conference !== "nan" ? (
                                  <a href={Paper.Conference} target="_blank">{Paper.Journal || "See Journal/Conference"}</a>
                                ) : (
                                  <span>{Paper.Journal}</span>
                                )}
                                {Paper["Publishing Year"] && <span>, {this.getPublishDate(Paper["Publishing Year"])}</span>}
                              </>
                            ) : null}
                          </div>

                          {Paper.Authors && <div className="author">{Paper.Authors}</div>}
                        </div>
                      </div>

                      <div className='arrow-item d-flex'>
                        <button onClick={() => this.togglePaper(index)}>
                          {this.state.openIndex === index ? <img src="./Assets/arrow-up-circle.svg" alt="accordion-button" /> : <img src="./Assets/arrow-down-circle.svg" alt="accordion-button" />}
                        </button>
                        <img src="./Assets/social-you-tube.svg" alt="you-tube" />
                      </div>
                    </div>

                    {/* Accordion content */}
                    {this.state.openIndex === index && (
                      <div className="accordion-content container">
                        {/* Replace this with actual content */}
                        <p>Here is the expanded content for {Paper.Title}</p>
                      </div>
                    )}
                  </div>
                ) : null
              )
            ) : (
              <div className="noPapers">No papers found.</div>
            )}
          </div>


          {
            Math.ceil(this.getPaginatedPaperDetails().length / this.state.studentsPerPage) !== 1 ?
              <div className="pagination">
                <div className="pagination-buttons">
                  <button className="btn-back" onClick={this.prevPage} disabled={this.state.currentPage === 0}>
                    <i className="fa-solid fa-chevron-left"></i>

                  </button>
                  <div className="page-number">
                    {this.state.currentPage + 1} of {Math.ceil(this.getPaginatedPaperDetails().length / this.state.studentsPerPage)}
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

          <div className='courseList container'>
            <div className="course-tabs">
              {this.state.allTeachingMaterials.map((cls, index) => (
                <div className={"course-tab " + (this.state.currentTeachingTitle === cls.Title ? "active" : "")} onClick={() => this.setState({ currentTeachingTitle: cls.Title, currentTeachingCls: cls.Course })} key={index}>
                  Course {index + 1}
                </div>
              ))}
            </div>

            <div className="course-card">
              <div className="card-header">
                <div className="course-name">{this.state.currentTeachingTitle}</div>
              </div>
              <div className="card-description">
                {this.state.currentTeachingCls}
              </div>
                <div className="card-download">
              <button> <img src="./Assets/pdf.svg" alt="pdf" /> Download Outline</button>
                </div>
            </div>
          </div>



        </div>



        <div className="ResSection" id="conferences">
          <div className="ResHeader container">
            <div className="teaching-header container">
              <div className='lineResHip'>
                <div className="ResTitle">Conferences
                </div>
                <img src="/Assets/line_sses.svg" className="line" /></div>
            </div>
          </div>

          <div className="PublicationsList">
            {this.getPaginatedCF().length > 0 ? (
              this.getPaginatedCF().map((Paper, index) => (
                Paper ? (
                  <div className='enclosePublic' key={index}>
                    <div className="PublicationItem container">
                      <div className="ResLogo">
                        <img src="/Assets/journal2.svg" alt="journal" />
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
          </div>

          {
            Math.ceil(this.getPaginatedCFDetails().length / this.state.studentsPerPage) !== 1 ?
              <div className="pagination">
                <div className="buttons">
                  <button className="btn-back" onClick={this.prevPageCF} disabled={this.state.currentPage2 === 0}>
                    <img className="frame-icon" loading="lazy" alt="" src="./Assets/back.svg" />
                  </button>
                  <div className="page-number">
                    {this.state.currentPage2 + 1} of {Math.ceil(this.getPaginatedCFDetails().length / this.state.studentsPerPage)}
                  </div>
                  <button className="btn-back"
                    onClick={this.nextPageCF}
                    disabled={(this.state.currentPage2 + 1) * this.state.studentsPerPage >= this.state.allConfarences.length}>
                    <img className="frame-icon" loading="lazy" alt="" src="./Assets/next.svg" />
                  </button>
                </div>
              </div>
              : null
          }
          <img className="ResImage" src="/Assets/res2.svg" />
        </div>
        {
          this.state.allAwards.length > 0 ?
            <>
              <div className="ResSection" id="conferences">
                <div className="ResHeader container">
                  <div className="teaching-header container">
                    <div className='lineResHip'>
                      <div className="ResTitle">Awards
                      </div>
                      <img src="/Assets/line_sses.svg" className="line" /></div>
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

        }

        <footer className="FooterSection">
          <div className="FooterContainer">
            <div className="FooterLeft">
              <span>© {this.state.currentProfileData.firstName} {this.state.currentProfileData.lastName} - {new Date().getFullYear()}</span>
            </div>
            <div className="FooterRight">
              {
                this.state.socialMedia.social?.facebook ?
                  <div className="SocialIcon"><i className="fa-brands fa-facebook"></i></div>
                  : null
              }
              {
                this.state.socialMedia.social?.x ?
                  <div className="SocialIcon"><i className="fa-brands fa-twitter"></i></div>
                  : null
              }
              {
                this.state.socialMedia.social?.linkedin ?
                  <div className="SocialIcon"><i className="fa-brands fa-linkedin-in"></i></div>
                  : null
              }
            </div>
          </div>
        </footer>

        <div className='contactMe'>
          <div className="card">
            <div className="card-title">{this.state.currentProfileData.firstName} {this.state.currentProfileData.lastName}</div>
            <div className="card-subtitle">
              {this.state.currentProfileData.designation}<br />
              {this.state.currentProfileData.university}<br />
            </div>
            <div className="card-details">
              E-mail: {this.state.currentProfileData.email}<br />
              {
                this.state.currentProfileData.phone ?
                  <>Tel: {this.state.currentProfileData.phone}<br /></>
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
