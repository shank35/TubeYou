export const UPLOAD_VIDEO = 'UPLOAD_VIDEO'

export const uploadVideo = async (title, description, selectedFile) => {
  const formData = new FormData();
  formData.append('video[title]', title);
  formData.append('video[description]', description);
  formData.append('video[video_file]', selectedFile);

  const response = await fetch('/api/videos', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    return { type: UPLOAD_VIDEO, payload: {success: true} };
  } else {
    const errorData = await response.json();
    console.error('Upload failed:', errorData.errors);
    return { type: UPLOAD_VIDEO, payload: { success: false, errors: errorData.errors} };
  }

}