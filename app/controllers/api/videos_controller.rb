class Api::VideosController < ApplicationController

  def index
    search_term = params[:search]
    if search_term.present?
      @videos = Video.where("lower(title) LIKE ?", "%#{search_term.downcase}%")
    else
      @videos = Video.all
    end
    render :index
  end

  def show
    @video = Video.find(params[:id])
    render :show
  end
  
  def random
    limit = 8
    @videos = Video.order("RANDOM()").limit(limit)
    render json: { videos: @videos }
  end

  def create
    if params[:video]
      @video = Video.new(video_params)
      @video.user_id = current_user.id
      @video.video_file.attach(video_params[:video_file])
  
      # Generate thumbnail
      video_file_path = @video.video_file.blob.service.path_for(@video.video_file.blob.key)
      movie = FFMPEG::Movie.new(video_file_path)
      thumbnail_path = Rails.root.join('tmp', "#{SecureRandom.uuid}.jpg")
      movie.screenshot(thumbnail_path, { seek_time: rand(0..movie.duration) })
      @video.thumbnail.attach(io: File.open(thumbnail_path), filename: 'thumbnail.jpg', content_type: 'image/jpeg')
  
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
