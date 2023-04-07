class Api::VideosController < ApplicationController

  def index
    @videos = Video.all
    render json: @videos
  end

  def show
    @video = Video.find(params[:id])
    render :show
  end

  def create 
    @video = Video.new(video_params.except(:video_file))
    if @video.save
      @video.video_file.attach(video_params[:video_file])
      render :show, status: :created
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update 
    @video = Video.find(params[:id])
    if @video.update(video_params)
      render :show
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    head :no_content
  end

  private

  def video_params
    params.require(:video).permit(:title, :description, :user_id, :views, :likes, :dislikes, :video_file)
  end

end
