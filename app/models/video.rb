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
  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  has_one_attached :video_file
  # validate :acceptable_video_file

  def video_file_url
    video_file.blob.url if video_file.attached?
  end
  
  

  # private

  # def acceptable_video_file
  #   return unless video_file.attached?
  
  #   acceptable_types = ['video/mp4', 'video/quicktime']
  #   unless acceptable_types.include?(video_file.content_type)
  #     errors.add(:video_file, "must be a video of type: mp4, mov")
  #   end
  # end
  
end
