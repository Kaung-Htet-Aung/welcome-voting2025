import React, { useState, useEffect, useRef, } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import "./Modal.css"
import {Navbar} from "./components/Navbar";
import {account,database} from './appwrite';
import { Query } from "appwrite";
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: "15px",
        top: "45.5%",
        transform: "translateY(-50%)",
        background: 'rgba(0, 0, 0, 0.5)',
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        zIndex: 1000,
        display: "flex", // Flexbox for centering
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src="./images/arrow.png" alt="" width={'15px'} height={'15px'}/>
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        right: "15px",
        top: "45%",
        transform: "translateY(-50%)",
        background: 'rgba(0, 0, 0, 0.5)', /* Transparent background */
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        zIndex: 1000,
        display: "flex", // Flexbox for centering
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src="./images/right-arrow.png" alt="" width={'15px'} height={'15px'}/>
    </button>
  );
};


const Boy = () => {
  const [candidates, setCandidates] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [votedCandidates,setVotedCandidates]=useState([])
  const [candidateToVote, setCandidateToVote] = useState({});
  const [modal, setModal] = useState(false);
  const [userId,setUserId]=useState(localStorage.getItem('session'));
  const [titles, setTitles] = useState(["King", "Attraction", "Smart"]) 
  const [selectedValue, setSelectedValue] = useState("king");
 // Update visible items based on screen size
  const determineVisibleItems = () => {
    const width = window.innerWidth;
    if (width > 1024) {
      setVisibleItems(3); // SuperLargeDesktop
    } else if (width > 768) {
      setVisibleItems(3); // Desktop
    } else if (width > 464) {
      setVisibleItems(2); // Tablet
    } else {
      setVisibleItems(1); // Mobile
    }
  };
 async function logout() {
  account.deleteSession('current')
    localStorage.removeItem('session');
    setUserId(null);
  }
 
  const handleSlideChange = (currentSlide) => {
    setActiveIndex(currentSlide);
  };


 const fetchVotedCandidates = async (title) => {
    try {
     
      const response = await database.listDocuments(
        "676ec63a00199012ab5d",
        "677b41bb003b1ea20928",
        [Query.equal("userId",userId)] //Filter votes by user ID
      );
      setVotedCandidates(response.documents);
      console.log(response.documents);
        
      const votedTitles = response.documents.map(item => item.title);
      const availableTitles = titles.filter(title => !votedTitles.includes(title));
      setTitles(availableTitles)
      setSelectedValue(availableTitles[0])
      
    } catch (err) {
      console.error("Failed to fetch votes:", err);
    }
  };

  const toggleModal = (candidate) => {
    setModal(!modal)
    setCandidateToVote(candidate)
    
  };
   const insertToAppwrite = async (updatedObject) => {
    const { candidateId, title } = updatedObject;
    const votedObj = {
      candidateId,
      userId,
      title // Adding the selected value
    };
   
    try {

      const response = await database.createDocument(
        "676ec63a00199012ab5d", // Replace with your Database ID
        "677b41bb003b1ea20928", // Replace with your Collection ID
        "unique()", // Generate a unique document ID
        votedObj
      );
      alert(`you have voted ${candidateId} for ${title} title`)
      fetchVotedCandidates(title)
      
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };
  const handleChange=(e)=>{
     setSelectedValue(e.target.value);
  }

  const handleVote = () => {
    
    if (selectedValue && candidateToVote) {
    const votedObj = {
      ...candidateToVote,
      title: selectedValue, // Adding the selected value
    };

    // Call insertToAppwrite with the updated object
    insertToAppwrite(votedObj);
    // Optionally close the modal
    setModal(false);
  }
  
      
  };
   if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  useEffect(() => {
   
    determineVisibleItems(); // Set on mount
    window.addEventListener("resize", determineVisibleItems); // Update on resize

    // Set images based on screen size
    const updateCandidate = () => {
      if (window.innerWidth > 768) {
         setCandidates([
          {
            candidateId:"1",
            imgSrc:"/images/1-zylh/IMG_4994.JPG",
            name:'Mg Zayar Lin Htet',
            section:"B",
            category:'boy',
            no:1,
          
          },
           {
            candidateId:"2",
            userId:"1",
            imgSrc:"/images/2-bly/IMG_4991.JPG",
            name:'Mg Bhone Let Yone',
            section:"A",
            category:'boy',
            no:2
          },
           {
            candidateId:"3",
            userId:"1",
            imgSrc:"/images/3-hda/IMG_4971.JPG",
            name:'Mg Hlaing Dwe Aung',
            section:"B",
            category:'boy',
            no:3
          },
           {
            candidateId:"4",
            userId:"1",
            imgSrc: "/images/4-dph/IMG_4999.JPG",
            name:'Mg Di Par Htun',
            section:"B",
            category:'boy',
            no:4
          },
           {
            candidateId:"5",
            userId:"1",
            imgSrc:"/images/5-twa/IMG_5003.JPG",
            name:'Mg Tin Win Aung',
            section:"C",
            category:'boy',
            no:5
          },
           {
            candidateId:"6",
            userId:"1",
            imgSrc:"/images/6-amt/IMG_5006.JPG",
            name:'Mg Aung Min Thu',
            section:"A",
             category:'boy',
            no:6
          },
           {
            candidateId:"7",
            userId:"1",
            imgSrc:"/images/7-khh/IMG_5010.JPG",
            name:'Mg Kyaw Hein Htet',
            category:'boy',
            section:"B",
            no:7
          },
           {
            candidateId:"8",
            userId:"1",
            imgSrc:"/images/8-ths/IMG_5012.JPG",
            name:'Mg Thar Htet San',
            section:"C",
            category:'boy',
            no:8
          },
           {
            candidateId:"9",
            userId:"1",
            imgSrc: "/images/9-kzo/kzo1.JPG",
            name:'Mg Kyaw Zin Oo',
            section:"B",
            category:'boy',
            no:9
          },
           {
            candidateId:"10",
            userId:"1",
            imgSrc:"/images/10-wca/wca1.JPG",
            name:'Mg Wine Chit Aung',
            section:"B",
            category:'boy',
            no:10
          },
         
        ]);
       
      } else {
        setCandidates([
          {
            candidateId:"1",
            userId:"1",
            imgSrc:'/images/1-zylh/IMG_4993.JPG',
            name:'Mg Zayar Lin Htet',
            section:"B",
            category:'boy',
            no:1
          },
           {
            candidateId:"2",
            userId:"1",
            imgSrc:"/images/2-bly/IMG_4990.JPG",
            name:'Mg Bhone Let Yone',
            section:"A",
            category:'boy',
            no:2
          },
           {
           candidateId:"3",
            userId:"1",
            imgSrc:"/images/3-hda/IMG_4996.JPG",
            name:'Mg Hlaing Dwe Aung',
            section:"B",
            category:'boy',
            no:3
          },
           {
            candidateId:"4",
            userId:"1",
            imgSrc: "/images/4-dph/IMG_4998.JPG",
            name:'Mg Di Par Htun',
            section:"B",
            category:'boy',
            no:4
          },
           {
            candidateId:"5",
            userId:"1",
            imgSrc:"/images/5-twa/IMG_5002.JPG",
            name:'Mg Tin Win Aung',
            section:"C",
            category:'boy',
            no:5
          },
           {
            candidateId:"6",
            userId:"1",
            imgSrc:"/images/6-amt/IMG_5005.JPG",
            name:'Mg Aung Min Thu',
            section:"A",
            category:'boy',
            no:6
          },
           {
            candidateId:"7",
            userId:"1",
            imgSrc:"/images/7-khh/IMG_5008.JPG",
            name:'Mg Kyaw Hein Htet',
            section:"B",
            category:'boy',
            no:7
          },
           {
            candidateId:"8",
            userId:"1",
            imgSrc:"/images/8-ths/IMG_5011.JPG",
            name:'Mg Thar Htet San',
            section:"C",
            category:'boy',
            no:8
          },
           {
            candidateId:"9",
            userId:"1",
            imgSrc: "/images/9-kzo/kzo.JPG",
            name:'Mg Kyaw Zin Oo',
            section:"B",
            category:'boy',
            no:9
          },
           {
            candidateId:"10",
            userId:"1",
            imgSrc:"/images/10-wca/wca.JPG",
            name:'Mg Wine Chit Aung',
            section:"B",
            category:'boy',
            no:10
          },
         
        ]);
      }
    };
    fetchVotedCandidates()
    updateCandidate(); // Set on mount
 
    return () => {
      window.removeEventListener("resize", determineVisibleItems);

    }; // Cleanup
  }, []);



  return (
    <div className="container">
      <Navbar/>
      <div className="carousel-container">
        <Carousel
          responsive={responsive}
          draggable={true}
          swipeable={true}
          customRightArrow={<CustomRightArrow/>}
          customLeftArrow={<CustomLeftArrow/>}
          afterChange={(previousSlide, { currentSlide }) => handleSlideChange(currentSlide)}
        >
          {candidates.map((candidate, index) => (
            <div key={index} style={{ position: "relative" }} className="img-container">
              <img src={candidate.imgSrc} className="carousel-image" alt={`Carousel Item ${index + 1}`} />
              <button className="voteBtn" onClick={()=>toggleModal(candidate)}  disabled={votedCandidates.some((vote) => vote.candidateId === candidate.candidateId)} >
                 {votedCandidates.some((vote) => vote.candidateId == candidate.candidateId) ? "Voted" : "Vote"}
              </button>
              <div
                className={`carousel-text ${
                  index >= activeIndex && index < activeIndex + visibleItems ? "animate" : ""
                }`}
              >
                <p>{candidate.name}</p>
                <p>Contestant No-{candidate.no}</p>
                 <p>Height-5' 8"</p>
              </div>
             
            </div>
            
          ))}
        </Carousel>
          {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
          <select value={selectedValue} onChange={handleChange}>
                {titles.map((title) => (
                    <option key={title} value={title}>
                    {title}
                </option>
      ))}
          </select>
            
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
             <button className="" onClick={handleVote}>
              Vote
            </button>
             <button onClick={logout}>logout</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Boy;


