import axios from 'axios';
import csrfFetch from '../store/csrf';

export const createComment = (commentData) => {
  return (dispatch) => {
    return csrfFetch('/api/csrf_token')
      .then((response) => response.text())
      .then((csrfToken) => {
        const headers = {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json',
        };
        return axios.post(`/api/videos/${commentData.videoId}/comments`, { comment: commentData }, { headers })
          .then(response => {
            const comment = response.data;
            dispatch({ type: 'CREATE_COMMENT_SUCCESS', comment });
          })
          .catch(error => {
            dispatch({ type: 'CREATE_COMMENT_FAILURE', error });
          });
      });
  };
};
