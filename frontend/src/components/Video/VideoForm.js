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
            <input className="title-form-control" type="text" placeholder="Title" name="titleInput" />
          </div>

          <div className="descriptionContainer">
            <textarea className="description-form-control" placeholder="Description" name="descriptionInput" rows="3"></textarea>
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
                      <span class="material-symbols-outlined" style={{fontSize: "50px"}}>upload</span>                    
                    </div>

                    <div className="modalVideoText1">
                      <p>Drag and drop video files to upload</p>
                    </div>

                    <div className="modalVideoText2">
                      <p>Your videos will be private until you publish them.</p>
                    </div>

                    <div className="modalVideoUploadTextContainer">
                      <div className="uploadLabelContainer">
                        <label htmlFor="fileInput" className="custom-file-upload">
                          <p>Select files</p>
                        </label>
                        <input type="file" id="fileInput" name="fileInput" required />
                      </div>
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
