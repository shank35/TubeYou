import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import video2 from "./video2.png";

import { useTheme } from "../Navigation/ThemeContext";

import "./reset.css";
import "./HomePage.css";

function HomePage() {
  const { theme } = useTheme();
  const [videos, setVideos] = useState({});

  useEffect(() => {
    const fetchRandomVideos = async () => {
      const response = await fetch("/api/videos/random");
      const data = await response.json();
      setVideos(data.videos);
    };
    fetchRandomVideos();
  }, []);

  
  return (
    <div className={`body ${theme}-theme`}>
      <div id="page">
        <div id="mainSectionContainer">
          {Array.isArray(videos) && videos.map((video) => (
            <Link to={`/videos/${video.id}`} key={video.id} className="videoLink">
              <div className="videoPlaceholder">
              <img src={video.thumbnail_url || video2} alt="Video thumbnail" />
                <div className="videoInfo">
                  <h3 className="videoTitle">{video.title}</h3>
                  <p className="videoChannel">{video.author_username}</p>
                  <p className="videoViews">
                    {video.views} views • {video.updated_at}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


export default HomePage;
