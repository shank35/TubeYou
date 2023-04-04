# app/views/users/index.json.jbuilder

json.array! @users do |user|
  json.extract! user, :id, :email, :username
end
