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
        zIndex: modal ? -5 : 7,
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
  const [titles, setTitles] = useState(["King", "Attraction", "Style"]) 
  const [selectedValue, setSelectedValue] = useState("King");
  const [isVotingOpen, setIsVotingOpen] = useState(false); // Voting status
  const [loading, setLoading] = useState(false);
   const [timeLeft, setTimeLeft] = useState(""); 
   const votingStartTime = new Date("2025-01-07T22:51:00");
    const votingEndTime = new Date("2025-01-10T12:16:00");
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
    localStorage.removeItem('session');
    setUserId(null);
  }
 
  const handleSlideChange = (currentSlide) => {
    setActiveIndex(currentSlide);
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
        zIndex: modal ? -5 : 7,
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
        zIndex: modal ? -5 : 7,
        display: "flex", // Flexbox for centering
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src="./images/right-arrow.png" alt="" width={'15px'} height={'15px'}/>
    </button>
  );
};
 const fetchVotedCandidates = async (title) => {
   setLoading(true);
    try {
     
      const response = await database.listDocuments(
        "6779a6320039942a4d7c",
        "677f96960019591e0088",
        [Query.equal("userId",userId)] //Filter votes by user ID
      );
      
      const boys = response.documents.filter(item => item.category=="boy");
      setVotedCandidates(boys);
      const votedTitles = boys.map(item => item.title);
      const availableTitles = titles.filter(title => !votedTitles.includes(title));
      setTitles(availableTitles)
      setSelectedValue(availableTitles[0])
      
    } catch (err) {
      console.error("Failed to fetch votes:", err);
    }finally {
        setLoading(false); // Set loading to false after fetching is complete
    }
  };

  const toggleModal = (candidate) => {
    setModal(!modal)
    setCandidateToVote(candidate)
    
  };
   const insertToAppwrite = async (updatedObject) => {
    setLoading(true)
    console.log(updatedObject);
    
    const { candidateId, title,category,section,height,name} = updatedObject;
    const votedObj = {
      candidateId,
      userId,
      title,
      category,
      height,
      section,
      name// Adding the selected value
    };
   
    try {

      const response = await database.createDocument(
        "6779a6320039942a4d7c", // Replace with your Database ID
        "677f96960019591e0088", // Replace with your Collection ID
        "unique()", // Generate a unique document ID
        votedObj
      );

       const candidateDoc = await database.listDocuments(
        "6779a6320039942a4d7c",
        "677f97aa0002f6d9402e",
        [
          Query.equal("candidateId",candidateId),
          Query.equal("category", "boy")   

        ] //Filter votes by user ID
      );
        const doc = candidateDoc.documents[0];
  
    // Step 3: Update the candidate's count
        await database.updateDocument(
           "6779a6320039942a4d7c", // Replace with your Database ID
           "677f97aa0002f6d9402e", // Replace with your Candidate Collection ID
           doc.$id, // The document ID of the candidate
          {
            votes: doc.votes + 1, // Increment votes by 1
          }
    );
    
      alert(`You have voted ${name} for ${title} title!`)
      fetchVotedCandidates(title)
      
    } catch (error) {
      console.error("Error creating document:", error);
    }finally{
      setLoading(false)
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
            height:'6\' 2"'
          
          },
           {
            candidateId:"2",
            userId:"1",
            imgSrc:"/images/2-bly/IMG_4991.JPG",
            name:'Mg Bhone Let Yone',
            section:"A",
            category:'boy',
            no:2,
            height:'6\''
          },
           {
            candidateId:"3",
            userId:"1",
            imgSrc:"/images/3-hda/IMG_4971.JPG",
            name:'Mg Hlaing Dwe Aung',
            section:"B",
            category:'boy',
            no:3,
            height:'5\' 6"'
          },
           {
            candidateId:"4",
            userId:"1",
            imgSrc: "/images/4-dph/IMG_4999.JPG",
            name:'Mg Di Par Htun',
            section:"B",
            category:'boy',
            no:4,
            height:'5\' 7"'
          },
           {
            candidateId:"5",
            userId:"1",
            imgSrc:"/images/5-twa/IMG_5003.JPG",
            name:'Mg Tin Win Aung',
            section:"C",
            category:'boy',
            no:5,
            height:'5\' 6"'
          },
           {
            candidateId:"6",
            userId:"1",
            imgSrc:"/images/6-amt/IMG_5006.JPG",
            name:'Mg Aung Min Thu',
            section:"A",
             category:'boy',
            no:6,
            height:'5\' 6"'
          },
           {
            candidateId:"7",
            userId:"1",
            imgSrc:"/images/7-khh/IMG_5010.JPG",
            name:'Mg Kyaw Hein Htet',
            category:'boy',
            section:"B",
            no:7,
            height:'5\' 6"'
          },
           {
            candidateId:"8",
            userId:"1",
            imgSrc:"/images/8-ths/IMG_5012.JPG",
            name:'Mg Thar Htet San',
            section:"C",
            category:'boy',
            no:8,
            height:'5\' 6"'
          },
           {
            candidateId:"9",
            userId:"1",
            imgSrc: "/images/9-kzo/kzo1.JPG",
            name:'Mg Kyaw Zin Oo',
            section:"B",
            category:'boy',
            no:9,
            height:'5\' 6"'
          },
           {
            candidateId:"10",
            userId:"1",
            imgSrc:"/images/10-wca/wca1.JPG",
            name:'Mg Wine Chit Aung',
            section:"B",
            category:'boy',
            no:10,
            height:'5\' 5"'
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
            no:1,
            height:'6\' 2"'
          },
           {
            candidateId:"2",
            userId:"1",
            imgSrc:"/images/2-bly/IMG_4990.JPG",
            name:'Mg Bhone Let Yone',
            section:"A",
            category:'boy',
            no:2,
            height:'6\''
          },
           {
           candidateId:"3",
            userId:"1",
            imgSrc:"/images/3-hda/IMG_4996.JPG",
            name:'Mg Hlaing Dwe Aung',
            section:"B",
            category:'boy',
            no:3,
            height:'5\' 6"'
          },
           {
            candidateId:"4",
            userId:"1",
            imgSrc: "/images/4-dph/IMG_4998.JPG",
            name:'Mg Di Par Htun',
            section:"B",
            category:'boy',
            no:4,
            height:'5\' 7"'
          },
           {
            candidateId:"5",
            userId:"1",
            imgSrc:"/images/5-twa/IMG_5002.JPG",
            name:'Mg Tin Win Aung',
            section:"C",
            category:'boy',
            no:5,
            height:'5\' 6"'
          },
           {
            candidateId:"6",
            userId:"1",
            imgSrc:"/images/6-amt/IMG_5005.JPG",
            name:'Mg Aung Min Thu',
            section:"A",
            category:'boy',
            no:6,
            height:'5\' 6"'
          },
           {
            candidateId:"7",
            userId:"1",
            imgSrc:"/images/7-khh/IMG_5008.JPG",
            name:'Mg Kyaw Hein Htet',
            section:"B",
            category:'boy',
            no:7,
            height:'5\' 6"'
          },
           {
            candidateId:"8",
            userId:"1",
            imgSrc:"/images/8-ths/IMG_5011.JPG",
            name:'Mg Thar Htet San',
            section:"C",
            category:'boy',
            no:8,
            height:'5\' 6"'
          },
           {
            candidateId:"9",
            userId:"1",
            imgSrc: "/images/9-kzo/kzo.JPG",
            name:'Mg Kyaw Zin Oo',
            section:"B",
            category:'boy',
            no:9,
            height:'5\' 6"'
          },
           {
            candidateId:"10",
            userId:"1",
            imgSrc:"/images/10-wca/wca.JPG",
            name:'Mg Wine Chit Aung',
            section:"B",
            category:'boy',
            no:10,
            height:'5\' 5"'
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
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

useEffect(() => {
  const updateTimer = () => {
    const now = new Date();
    const startDiff = votingStartTime - now;
    const endDiff = votingEndTime - now;

    if (endDiff <= 0) {
      setIsVotingOpen(false);
      setTimeLeft("Voting has ended.");
      return; // No further updates needed
    }

    if (startDiff <= 0) {
      setIsVotingOpen(true);
      setTimeLeft(`Voting will end in: ${formatTime(endDiff)}`);
    } else {
      setTimeLeft(formatTime(startDiff));
    }
  };

  updateTimer(); // Initial update
  const timer = setInterval(updateTimer, 1000);

  return () => clearInterval(timer); // Clean up timer on unmount
}, [votingStartTime, votingEndTime]);

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
              <button className="voteBtn" onClick={()=>toggleModal(candidate)}  disabled={votedCandidates.some((vote) => vote.candidateId === candidate.candidateId)||!isVotingOpen||loading==true|| votedCandidates.length==3 } >
                   {loading ? "Loading...":votedCandidates.some((vote) => vote.candidateId == candidate.candidateId)|| votedCandidates.length==3 ? "Voted" : "Vote"}
              </button>
              <div
                className={`carousel-text ${
                  index >= activeIndex && index < activeIndex + visibleItems ? "animate" : ""
                }`}
              >
                <p>{candidate.name}</p>
                <p>Contestant No-{candidate.no}</p>
                 <p>Height-{candidate.height}</p>
              </div>
             
            </div>
            
          ))}
        </Carousel>
          {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Select the title </h2>
            <div>
      <form>
     {titles.map((title) => (
      <div className="radiobtn">
		       <input type="radio"
				  	 name="title"
             value={title}  
             id={title}
             checked={selectedValue == title} 
             onChange={handleChange} 
            />
		  <label htmlFor={`${title}`}>{title}</label>

	  </div>
     
    ))}</form></div>

            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
            <div className="button-wrapper primary">  
             <button className="button" type="button" onClick={handleVote}>
                   Vote Him
               <span className="button-inner-wrapper">    
               <span className="button-inner"></span>
               </span>
             </button>
</div>
          </div>
        </div>
      )}
      </div>
      
         <h2 style={{ color: "white", textAlign: 'center',marginTop:'15px' }}>
         {isVotingOpen
            ? `You can vote now! ${timeLeft}`
          : timeLeft
        }
      </h2>
      
      
    </div>
  );
};

export default Boy;


