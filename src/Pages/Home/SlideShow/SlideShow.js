import React from "react";
import { Slide } from "react-slideshow-image";
import "./SlideShow.css";
import slide1 from "../../../images/slide-1.jpg";
import slide3 from "../../../images/slide3.jpg";
import slide2 from "../../../images/slide2.jpg";
import slide4 from "../../../images/slide4.jpg";
const slideImages = [
  {
    url: slide1,
    caption: "Great View",
  },
  {
    url: slide2,
    caption: "Comfort First",
  },
  {
    url: slide3,
    caption: "Big Pools",
  },
  {
    url: slide4,
    caption: "Luxury",
  },
];

const SlideShow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div style={{ backgroundImage: `url(${slideImage.url})` }}>
              <span>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideShow;
