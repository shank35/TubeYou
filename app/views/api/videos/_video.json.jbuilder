json.extract! video, :id, :title, :description, :user_id, :author_username, :views, :likes, :dislikes
json.video_file_url video.video_file_url
json.authorUsername video.author_username
json.commentIds video.comments.pluck(:id)
