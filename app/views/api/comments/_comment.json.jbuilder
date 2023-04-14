# app/views/comments/_comment.json.jbuilder
json.extract! comment, :id, :content, :video_id, :author_id, :parent_comment_id, :replies
json.author_username comment.author.username
