# app/views/users/index.json.jbuilder
@videos.each do |videos|
  json.set! video.id do
    json.partial! "api/videos/video", video: video
  end
end
