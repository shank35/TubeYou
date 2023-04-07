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
  
  validates :video_file, attached: true, size: { less_than: 2000.megabytes }, content_type: ['video/mp4', 'video/mpeg', 'video/quicktime']


  validate :acceptable_video_file

  def video_file_url
    video_file.service_url if video_file.attached?
  end

  private

  def acceptable_video_file
    return unless video_file.attached?

    if video_file.blob.byte_size > 2000.megabytes
      errors.add(:video_file, 'is too big')
    end

    acceptable_types = ['video/mp4', 'video/mpeg', 'video/quicktime']
    unless acceptable_types.include?(video_file.blob.content_type)
      errors.add(:video_file, 'must be a video file (mp4, mpeg, or mov)')
    end
  end

end
