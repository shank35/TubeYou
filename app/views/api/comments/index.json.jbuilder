# app/views/api/comments/show.json.jbuilder
@comments.each do |comment|
  json.set! comment.id do
    json.partial! "api/comments/comment", comment: comment
  end
end
