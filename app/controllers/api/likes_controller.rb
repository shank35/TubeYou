# app/controllers/api/v1/likes_controller.rb

class Api::LikesController < ApplicationController
  before_action :set_video

  def index
    likes = @video.likes
    like_count = likes.where(liked: true).count
    dislike_count = likes.where(liked: false).count
    render json: { like_count: like_count, dislike_count: dislike_count }
  end
  

  def show
    video = Video.find(params[:video_id])
    likes = video.likes.group(:liked).count
    render :show
  end
  
  def create
    like = current_user.likes.find_or_initialize_by(video_id: params[:video_id])
    like.liked = params[:liked]
    if like.save
      render json: { success: true, like: like.as_json(only: [:id, :liker_id, :video_id, :liked]) }
    else
      render json: { success: false }
    end
  end
  
  def destroy
    like = current_user.likes.find_by(video_id: params[:video_id])
    if like && like.destroy
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  private

  def set_video
    @video = Video.find(params[:video_id])
  end

  def like_params
    params.require(:like).permit(:video_id, :liked)
  end


end
