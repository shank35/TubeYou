# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  content           :text             not null
#  video_id          :bigint           not null
#  author_id         :bigint           not null
#  parent_comment_id :bigint
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Comment < ApplicationRecord
  
  belongs_to :video
  belongs_to :author, class_name: 'User', foreign_key: :author_id
  belongs_to :parent_comment, class_name: 'Comment', optional: true
  has_many :replies, class_name: 'Comment', foreign_key: 'parent_comment_id', dependent: :destroy

  validates :content, presence: true
end
