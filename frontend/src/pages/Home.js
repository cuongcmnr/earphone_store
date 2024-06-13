import React from "react";
import { Link } from "react-router-dom";
import BannerVideo from "../assets/video.mp4";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" >
      <video autoPlay loop muted className="backgroundVideo">
       <source src={BannerVideo} type="video/mp4" />
      </video>
      <div className="headerContainer">
        <p> Explore a Selection of Sony</p>
        <Link to="/menu">
          <button> BUY NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;