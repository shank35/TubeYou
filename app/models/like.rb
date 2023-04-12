# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  liker_id   :bigint           not null
#  video_id   :bigint           not null
#  liked      :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# app/models/like.rb

class Like < ApplicationRecord
  belongs_to :liker, class_name: 'User'
  belongs_to :video
  validates :liker_id, uniqueness: { scope: :video_id }

end
