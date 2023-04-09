json.extract! user, :id, :first_name, :last_name, :email, :username
json.videoIds user.videos.pluck(:id)
