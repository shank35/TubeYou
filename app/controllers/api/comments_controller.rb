# app/controllers/comments_controller.rb
class Api::CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    @comments = Comment.where(video_id: params[:video_id], parent_comment_id: nil)
    render :index
  end

  def create
    @comment = current_user.comments.new(comment_params)
    @comment.video_id = params[:video_id]
  
    if @comment.save
      render :show, status: :created
    else
      debugger
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  

  def show
    render :show
  end

  def update
    if @comment.update(comment_params)
      render :show
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  def destroy
    @comment.destroy
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:content, :video_id)
  end
  
end
