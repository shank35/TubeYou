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

  has_one_attached :video_file

  def video_file_url
    if video_file.attached?
      video_file.url
    end
  end
end


