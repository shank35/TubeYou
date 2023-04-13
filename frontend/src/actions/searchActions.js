export const SEARCH_VIDEOS = "SEARCH_VIDEOS";

export const searchVideos = (videos) => ({
  type: SEARCH_VIDEOS,
  payload: videos,
});
