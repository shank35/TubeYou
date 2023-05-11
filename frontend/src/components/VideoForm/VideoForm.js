import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '../../actions/videoActions';
import UserProfile from '../UserProfile';
import './VideoForm.css';

function VideoForm() {
  const user = useSelector(state => state?.session.user);
  console.log(user)
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file.type === "video/mp4") {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid MP4 file.");
    }
  };

  const handleUploadVideo = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    await dispatch(uploadVideo(title, description, selectedFile, setUploadProgress));
    setIsUploading(false);
    if (!isUploading) {
      handleCloseModal();
    }
  };

  return (
    <>
      <form className="video-form">
        <div className="video-form-group">
        <div className="selectFileContainer">
          <button type="button" className="selectFile" onClick={handleOpenModal}>Select files to upload</button>
        </div>
        </div>
      </form>
      {showModal && (
        <div className="modalVideoContainer">
          <div className="modalVideoOverlay" onClick={handleCloseModal}></div>
          <div className="modalVideoContent">
            <div className="modalVideoHeader">
              <h2>Upload video</h2>
              <button className="closeVideoModalButton" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modalVideoBody">
              <div className="modalVideoUploadArea">
                {selectedFile ? (
                  <div className="modalVideoFormContainer">
                    <form onSubmit={handleUploadVideo}>
                      <div className="titleContainer">
                        <input
                          className="title-form-control"
                          type="text"
                          placeholder="Title"
                          name="titleInput"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="descriptionContainer">
                        <textarea
                          className="description-form-control"
                          placeholder="Description"
                          name="descriptionInput"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />                      
                      </div>
                      <div className="uploadVideoContainer">
                        <button className="uploadVideo" type="submit">
                          Upload Video
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="modalVideoUploadFormContainer">
                    <div className="modalVideoUploadIconContainer">
                      <span className="material-symbols-outlined" style={{fontSize: "50px"}}>upload</span>                    
                    </div>
                    <div className="modalVideoText1">
                      <p>Click select files to upload a video.</p>
                    </div>
                    <div className="modalVideoText2">
                      <p>Accepted file type: MP4</p>
                    </div>
                    <div className="modalVideoUploadTextContainer">
                      <div className="uploadLabelContainer">
                        <label htmlFor="fileInput" className="custom-file-upload">
                          <p>Select files</p>
                        </label>
                        <input type="file" id="fileInput" name="fileInput" required accept="video/mp4" onChange={handleFileInputChange} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div><UserProfile/></div>
    </>
  );
}

export default VideoForm;
