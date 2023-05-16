class Api::VideosController < ApplicationController

  def index
    search_term = params[:search]
    if search_term.present?
      @videos = Video.where("lower(title) LIKE ?", "%#{search_term.downcase}%")
    else
      @videos = Video.all
    end
    videos_json = @videos.map do |video|
      video.as_json.merge(
        video_file_url: video.video_file_url,
        thumbnail_url: video.thumbnail_url,
        author_username: video.author_username,
        updated_at: video.updated_at.strftime("%B %d, %Y")
      )
    end   
    render json: { videos: videos_json }
  end
  

  def show
    @video = Video.joins(:user).where(id: params[:id]).select("videos.*, users.username as author_username").first
    render :show
  end  
  
  def random
    limit = 8
    @videos = Video.order("RANDOM()").limit(limit)
    videos_json = @videos.map do |video|
      video.as_json.merge(
        video_file_url: video.video_file_url,
        thumbnail_url: video.thumbnail_url,
        author_username: video.author_username,
        updated_at: video.updated_at.strftime("%B %d, %Y")
      )
    end    
    render json: { videos: videos_json }
  end
  

  def user_videos
    @videos = Video.where(user_id: params[:user_id])
    render json: { videos: @videos }
  end  

  def create 
    if params[:video]
      @video = Video.new(video_params)
      @video.user_id = current_user.id
      @video.video_file.attach(video_params[:video_file])
      @video.thumbnail.attach(video_params[:thumbnail])
      
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
    params.require(:video).permit(:title, :description, :user_id, :views, :likes, :dislikes, :video_file, :thumbnail)
  end  

end
