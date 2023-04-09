import csrfFetch from '../store/csrf';

export const UPLOAD_VIDEO = 'UPLOAD_VIDEO';

// export const uploadVideo = async (title, description, selectedFile, onUploadProgress) => {
//   const formData = new FormData();
//   formData.append('video[title]', title);
//   formData.append('video[description]', description);
//   formData.append('video[video_file]', selectedFile);

//   const response = await csrfFetch('/api/videos', {
//     method: 'POST',
//     body: formData,
//   });

//   if (response.ok) {
//     return { type: UPLOAD_VIDEO, payload: {success: true} };
//   } else {
//     const errorData = await response.json();
//     console.error('Upload failed:', errorData.errors);
//     return { type: UPLOAD_VIDEO, payload: { success: false, errors: errorData.errors} };
//   }

// }

export const uploadVideo = (title, description, file, setUploadProgress) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('video[title]', title);
      formData.append('video[description]', description);
      formData.append('video[video_file]', file);

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
