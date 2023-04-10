class Api::VideosController < ApplicationController

  def index
    @videos = Video.all
    render :index
  end

  def show
    @video = Video.find(params[:id])
    render :show
  end
  
  def create 
    if params[:video]
      @video = Video.new(video_params)
      @video.user_id = current_user.id # or any other valid user ID
      @video.video_file.attach(video_params[:video_file])
      if @video.save
        render :show, status: :created
      else
        puts @video.errors.full_messages
        render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Missing 'video' parameter" }, status: :unprocessable_entity
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