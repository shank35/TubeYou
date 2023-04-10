# app/views/comments/_comment.json.jbuilder
json.extract! comment, :id, :content, :video_id, :author_id, :replies