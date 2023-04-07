# app/views/users/index.json.jbuilder
@users.each do |user|
  json.set! user.id do
    json.partial! "api/users/user", user: user
  end
end
