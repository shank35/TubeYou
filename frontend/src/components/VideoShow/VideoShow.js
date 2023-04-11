// VideoShow.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import { receiveVideo } from '../../actions/videoActions';

const VideoShow = ({ videoId, user }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videos = useSelector(state => state.videos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`/api/videos/${videoId}`);
        setVideo(response.data.video);
        dispatch(receiveVideo(response.data.video)); 
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [dispatch, videoId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return video ? <VideoPlayer video={video} user={user} /> : <div>Loading...</div>;
};

export default VideoShow;
