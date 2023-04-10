# app/views/api/comments/index.json.jbuilder
json.comment do
  json.partial! "api/comments/comment", comment: @comment
end