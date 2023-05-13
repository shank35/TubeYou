# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  title       :string(100)      not null
#  description :text
#  user_id     :bigint           not null
#  views       :integer          default(0)
#  likes       :integer          default(0)
#  dislikes    :integer          default(0)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord
  belongs_to :user

  has_many :comments,
    primary_key: :id,
    foreign_key: :video_id,
    class_name: :Comment,
    dependent: :destroy

  has_many :likes, dependent: :destroy

  has_one_attached :video_file

  def author_username
    user.username
  end
  
  def video_file_url
    if video_file.attached?
      video_file.url
    end
  end

  def random_thumbnail_url
    if video_file.attached?
      output_dir = Rails.root.join("public", "thumbnails")
      FileUtils.mkdir_p(output_dir) unless File.directory?(output_dir)

      video = FFMPEG::Movie.new(video_file.service_url)
      random_time = rand(0..video.duration).to_i
      output_path = output_dir.join("#{id}-thumbnail-#{random_time}.jpg")

      unless File.exist?(output_path)
        video.screenshot(output_path.to_s, seek_time: random_time)
      end

      "/thumbnails/#{id}-thumbnail-#{random_time}.jpg"
    end
  end
  
end


