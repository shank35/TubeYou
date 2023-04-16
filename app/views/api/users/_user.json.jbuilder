json.extract! user, :id, :email, :username
json.videoIds user.videos.pluck(:id)
