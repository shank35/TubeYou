import React, { useState } from 'react';
import './VideoForm.css';

function VideoForm() {

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <form className="video-form">

        <div className="video-form-group">

          <div className="selectFileContainer">
            <button className="selectFile" onClick={handleOpenModal}>Select files to upload</button>
          </div>

          <div className="titleContainer">
            <input className="form-control" type="text" placeholder="Title" name="titleInput" />
          </div>

          <div className="descriptionContainer">
            <textarea className="form-control" placeholder="Description" name="descriptionInput" rows="3"></textarea>
          </div>

          {/* <div className="formControlContainer">
            <select className="form-control" name="privacyInput">
              <option value="0">Private</option>
              <option value="1">Public</option>
            </select>
          </div> */}

          <div className="uploadVideoContainer">
            <button className="uploadVideo" type="submit">
              Upload Video
            </button>
          </div>

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
                    <div className="modalVideoUploadIconContainer">
                      <span class="material-symbols-outlined" style={{fontSize: "50px"}}>upload</span>                    </div>
                    <div className="modalVideoUploadTextContainer">
                      <p>Select files to upload</p>
                      <input type="file" className="form-control-file" id="exampleFormControlFile1" name="fileInput" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </form>
    </>
  );
}

export default VideoForm;
