// videoActions.js
import csrfFetch from '../store/csrf';

export const UPLOAD_VIDEO = 'UPLOAD_VIDEO';
export const DELETE_VIDEO = 'DELETE_VIDEO';
export const EDIT_VIDEO = 'EDIT_VIDEO';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';

export const receiveVideo = (video) => {
  return {
    type: RECEIVE_VIDEO,
    payload: video,
  };
};

export const uploadVideo = (title, description, file, thumbnailFile, setUploadProgress) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('video[title]', title);
      formData.append('video[description]', description);
      formData.append('video[video_file]', file);
      formData.append('video[thumbnail]', thumbnailFile);

      const response = await csrfFetch('/api/videos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw response;
      }

      const video = await response.json();

      dispatch({
        type: UPLOAD_VIDEO,
        video,
      });

      setUploadProgress(0);

    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteVideo = (id) => async (dispatch) => {
  try {
    // Perform the delete request using your API
    const response = await csrfFetch(`/api/videos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw response;
    }
    dispatch({
      type: DELETE_VIDEO,
      payload: id,
    });
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export const editVideo = (id, title, description) => async (dispatch) => {
  try {
    // Perform the update request using your API
    const response = await csrfFetch(`/api/videos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw response;
    }

    const updatedVideo = await response.json();

    dispatch({
      type: EDIT_VIDEO,
      payload: updatedVideo,
    });
  } catch (error) {
    // Handle error
    console.error(error);
  }
};
