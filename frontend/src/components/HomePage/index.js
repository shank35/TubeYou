import React from "react";
import video1 from "./video1.png";

import "./reset.css";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="body">
      <div id="page">
        <div id="mainSectionContainer">
          <div className="videoPlaceholder">
            <img src={video1} alt="video thumbnail" />
            <div className="videoInfo">
              <h3 className="videoTitle">Video Title</h3>
              <p className="videoChannel">Channel Name</p>
              <p className="videoViews">1.5M views • 1 week ago</p>
            </div>
          </div>
          <div className="videoPlaceholder">
          <img src={video1} alt="video thumbnail" />
            <div className="videoInfo">
              <h3 className="videoTitle">Video Title</h3>
              <p className="videoChannel">Channel Name</p>
              <p className="videoViews">3.2M views • 2 weeks ago</p>
            </div>
          </div>
          <div className="videoPlaceholder">
          <img src={video1} alt="video thumbnail" />
            <div className="videoInfo">
              <h3 className="videoTitle">Video Title</h3>
              <p className="videoChannel">Channel Name</p>
              <p className="videoViews">2.1M views • 3 weeks ago</p>
            </div>
          </div>
          <div className="videoPlaceholder">
          <img src={video1} alt="video thumbnail" />
            <div className="videoInfo">
              <h3 className="videoTitle">Video Title</h3>
              <p className="videoChannel">Channel Name</p>
              <p className="videoViews">4.5M views • 4 weeks ago</p>
            </div>
          </div>
          <div className="videoPlaceholder">
            <img src={video1} alt="video thumbnail" />
            <div className="videoInfo">
              <h3 className="videoTitle">Video Title</h3>
              <p className="videoChannel">Channel Name</p>
              <p className="videoViews">1.2M views • 5 weeks ago</p>
            </div>
          </div>
          <div className="videoPlaceholder">
            <img src={video1} alt="video thumbnail" />
            <div className="videoInfo">
              <h3 className="videoTitle">Video Title</h3>
              <p className="videoChannel">Channel Name</p>
              <p className="videoViews">2.8M views • 6 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
