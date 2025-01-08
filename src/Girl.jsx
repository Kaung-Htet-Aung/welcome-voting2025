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
  const [titles, setTitles] = useState(["Queen", "Attraction", "Cute"]) 
  const [selectedValue, setSelectedValue] = useState("king");
  const [isVotingOpen, setIsVotingOpen] = useState(false); // Voting status
  const [loading, setLoading] = useState(false);
   const [timeLeft, setTimeLeft] = useState(""); 
   const votingStartTime = new Date("2025-01-07T22:51:00");
    const votingEndTime = new Date("2025-01-09T24:13:00");
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


 const fetchVotedCandidates = async (title) => {
    try {
     
      const response = await database.listDocuments(
        "676ec63a00199012ab5d",
        "677b41bb003b1ea20928",
        [Query.equal("userId",userId)] //Filter votes by user ID
      );
      const girls= response.documents.filter(item => item.category=="girl");
      setVotedCandidates(girls);

      const votedTitles = girls.map(item => item.title);
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
        "676ec63a00199012ab5d", // Replace with your Database ID
        "677b41bb003b1ea20928", // Replace with your Collection ID
        "unique()", // Generate a unique document ID
        votedObj
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
            imgSrc:"/images/girls/1-sye/IMG_50281.JPG",
            name:'Ma Shwe Yee Eaint',
            section:"C",
            category:'girl',
            height:'5\' 8"',
            no:1
          },
           {
            candidateId:"2",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/2-lhho/IMG_50331.JPG",
            name:'Ma Lin Htet Htet Oo',
            section:"A",
            no:2
            
          },
           {
            candidateId:"3",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/3-eksl/IMG_50341.JPG",
            name:'Ma Ei Kyal Sin Lin',
            section:"B",
            no:3
          },
           {
            candidateId:"4",
            height:'5\' 8"',
            category:'girl',
            imgSrc: "/images/girls/4-kps/IMG_50351.JPG",
            name:'Ma Khin Pyae Sone',
            section:"C",
            no:4
          },
           {
            candidateId:"5",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/5-chts/IMG_50371.JPG",
            name:'Ma Chuu Htet Thansin',
            section:"B",
            no:5
          },
           {
            candidateId:"6",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/6-yta/IMG_50381.JPG",
            name:'Ma Yoon Thiri Aung',
            section:"B",
            no:6
          },
           {
            candidateId:"7",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/7-hmn/IMG_50411.JPG",
            name:'Ma Hsu Myat Nwe',
            section:"B",
            no:7
          },
           {
            candidateId:"8",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/8-hhha/IMG_20351.JPG",
            name:'Ma Hnin Htet Htet Aung',
            section:"A",
            no:8
          },
           {
            candidateId:"9",
            height:'5\' 8"',
            category:'girl',
            imgSrc: "/images/girls/9-nlp/IMG_50461.JPG",
            name:'Ma Nwe Linn Phyu',
            section:"B",
            no:9
          },
           {
            candidateId:"10",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/10-mtw/IMG_50421.JPG",
            name:'Ma Myat Thidar Win',
            section:"A",
            no:10
          },
         
        ]);
       
      } else {
       setCandidates([
          {
            candidateId:"1",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/1-sye/IMG_5028.JPG",
            name:'Ma Shwe Yee Eaint',
            section:"C",
            no:1
          },
           {
            candidateId:"2",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/2-lhho/IMG_5033.JPG",
            name:'Ma Lin Htet Htet Oo',
            section:"A",
            no:2
          },
           {
            candidateId:"3",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/3-eksl/IMG_5034.JPG",
            name:'Ma Ei Kyal Sin Lin',
            section:"B",
            no:3
          },
           {
            candidateId:"4",
            height:'5\' 8"',
            category:'girl',
            imgSrc: "/images/girls/4-kps/IMG_5035.JPG",
            name:'Ma Khin Pyae Sone',
            section:"C",
            no:4
          },
           {
            candidateId:"5",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/5-chts/IMG_5037.JPG",
            name:'Ma Chuu Htet Thansin',
            section:"B",
            no:5
          },
           {
            candidateId:"6",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/6-yta/IMG_5038.JPG",
            name:'Ma Yoon Thiri Aung',
            section:"B",
            no:6
          },
           {
            candidateId:"7",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/7-hmn/IMG_5041.JPG",
            name:'Ma Hsu Myat Nwe',
            section:"B",
            no:7
          },
           {
            candidateId:"8",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/8-hhha/IMG_2035.JPG",
            name:'Ma Hnin Htet Htet Aung',
            section:"A",
            no:8
          },
           {
            candidateId:"9",
            height:'5\' 8"',
            category:'girl',
            imgSrc: "/images/girls/9-nlp/IMG_5046.JPG",
            name:'Ma Nwe Linn Phyu',
            section:"B",
            no:9
          },
           {
            candidateId:"10",
            height:'5\' 8"',
            category:'girl',
            imgSrc:"/images/girls/10-mtw/IMG_5042.JPG",
            name:'Ma Myat Thidar Win',
            section:"A",
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
      setTimeLeft(`Voting ends in: ${formatTime(endDiff)}`);
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
              <button className="voteBtn" onClick={()=>toggleModal(candidate)}  disabled={votedCandidates.some((vote) => vote.candidateId === candidate.candidateId)||!isVotingOpen || votedCandidates.length==3 } >
                 {votedCandidates.some((vote) => vote.candidateId == candidate.candidateId)||votedCandidates.length==3 ? "Voted" : "Vote"}
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
             <button className="" onClick={handleVote}  >
                 vote
            </button>
          </div>
        </div>
      )}
      </div>
      
         <h2 style={{ color: "white", textAlign: 'center' }}>
         {isVotingOpen
            ? `You can vote now! ${timeLeft}`
          : timeLeft
        }
      </h2>
      
    </div>
  );
};

export default Boy;


