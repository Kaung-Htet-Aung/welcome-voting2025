import React, { useState, useEffect, useRef, } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import { Link,useParams } from "react-router-dom";
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
const Girl = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
 
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

  const handleSlideChange = (currentSlide) => {
    setActiveIndex(currentSlide);
  };
 const handleGetValue = () => {
    const paperContent = paperRef.current.innerText; // Get plain text content
    console.log("Paper Content:", paperContent);
  };

  useEffect(() => {
    determineVisibleItems(); // Set on mount
    window.addEventListener("resize", determineVisibleItems); // Update on resize

    // Set images based on screen size
    const updateImages = () => {
      if (window.innerWidth > 768) {
         setImages([
          {
            imgSrc:"/images/girls/1-sye/IMG_50281.JPG",
            name:'Ma Shwe Yee Eaint',
            section:"C",
            no:1
          },
           {
            imgSrc:"/images/girls/2-lhho/IMG_50331.JPG",
            name:'Ma Lin Htet Htet Oo',
            section:"A",
            no:2
          },
           {
            imgSrc:"/images/girls/3-eksl/IMG_50341.JPG",
            name:'Ma Ei Kyal Sin Lin',
            section:"B",
            no:3
          },
           {
            imgSrc: "/images/girls/4-kps/IMG_50351.JPG",
            name:'Ma Khin Pyae Sone',
            section:"C",
            no:4
          },
           {
            imgSrc:"/images/girls/5-chts/IMG_50371.JPG",
            name:'Ma Chuu Htet Thansin',
            section:"B",
            no:5
          },
           {
            imgSrc:"/images/girls/6-yta/IMG_50381.JPG",
            name:'Ma Yoon Thiri Aung',
            section:"B",
            no:6
          },
           {
            imgSrc:"/images/girls/7-hmn/IMG_50411.JPG",
            name:'Ma Hsu Myat Nwe',
            section:"B",
            no:7
          },
           {
            imgSrc:"/images/girls/8-hhha/IMG_20351.JPG",
            name:'Ma Hnin Htet Htet Aung',
            section:"A",
            no:8
          },
           {
            imgSrc: "/images/girls/9-nlp/IMG_50461.JPG",
            name:'Ma Nwe Linn Phyu',
            section:"B",
            no:9
          },
           {
            imgSrc:"/images/girls/10-mtw/IMG_50421.JPG",
            name:'Ma Myat Thidar Win',
            section:"A",
            no:10
          },
         
        ]);
       
      } else {
       setImages([
          {
            imgSrc:"/images/girls/1-sye/IMG_5028.JPG",
            name:'Ma Shwe Yee Eaint',
            section:"C",
            no:1
          },
           {
            imgSrc:"/images/girls/2-lhho/IMG_5033.JPG",
            name:'Ma Lin Htet Htet Oo',
            section:"A",
            no:2
          },
           {
            imgSrc:"/images/girls/3-eksl/IMG_5034.JPG",
            name:'Ma Ei Kyal Sin Lin',
            section:"B",
            no:3
          },
           {
            imgSrc: "/images/girls/4-kps/IMG_5035.JPG",
            name:'Ma Khin Pyae Sone',
            section:"C",
            no:4
          },
           {
            imgSrc:"/images/girls/5-chts/IMG_5037.JPG",
            name:'Ma Chuu Htet Thansin',
            section:"B",
            no:5
          },
           {
            imgSrc:"/images/girls/6-yta/IMG_5038.JPG",
            name:'Ma Yoon Thiri Aung',
            section:"B",
            no:6
          },
           {
            imgSrc:"/images/girls/7-hmn/IMG_5041.JPG",
            name:'Ma Hsu Myat Nwe',
            section:"B",
            no:7
          },
           {
            imgSrc:"/images/girls/8-hhha/IMG_2035.JPG",
            name:'Ma Hnin Htet Htet Aung',
            section:"A",
            no:8
          },
           {
            imgSrc: "/images/girls/9-nlp/IMG_5046.JPG",
            name:'Ma Nwe Linn Phyu',
            section:"B",
            no:9
          },
           {
            imgSrc:"/images/girls/10-mtw/IMG_5042.JPG",
            name:'Ma Myat Thidar Win',
            section:"A",
            no:10
          },
         
        ]);
       
      }
    };

    updateImages(); // Set on mount
 
    return () => {
      window.removeEventListener("resize", determineVisibleItems);

    }; // Cleanup
  }, []);

  return (
    <div className="container">
       <nav>
        <div className="logo">
            <img src="./images/logo.webp" alt="" width={50} height={50} style={{lineHeight:50}}/>
        </div>
        <ul id="menuList">
            <li><Link to="/">Boys</Link></li>
            <li><Link to="/girl">Girls</Link></li>
        </ul>
      
    </nav>

      <div className="carousel-container">
        <Carousel
          responsive={responsive}
          draggable={true}
          swipeable={true}
          customRightArrow={<CustomRightArrow/>}
          customLeftArrow={<CustomLeftArrow/>}
          afterChange={(previousSlide, { currentSlide }) => handleSlideChange(currentSlide)}
        >
          {images.map((candidate, index) => (
            <div key={index} style={{ position: "relative" }} className="img-container">
              <img src={candidate.imgSrc} className="carousel-image" alt={`Carousel Item ${index + 1}`} />
              <div
                className={`carousel-text ${
                  index >= activeIndex && index < activeIndex + visibleItems ? "animate" : ""
                }`}
              >
                <p>{candidate.name}</p>
                <p>Section-{candidate.section}</p>
                <p>Contestant No-{candidate.no}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="footer-container">
               <div id="outer-div"> 
                  
                   <div className="inner-div">2024-2025 UCSMGY FRESHER WELCOME</div>
                   <div style={{width:'80%',margin:'0 auto'}}>
                     <p>
"Welcome, freshers! It’s time to vote for the titles of this batch. Let’s make this a fun start to your journey here, and may the best candidates win! Get ready to enjoy every moment!"                      </p>
                     
                   </div>
                </div> 
         </div>
      </div>
    </div>
  );
};

export default Girl;
