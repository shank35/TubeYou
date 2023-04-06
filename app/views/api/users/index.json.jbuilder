# app/views/users/index.json.jbuilder
@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :first_name, :last_name, :email, :username
  end
end
