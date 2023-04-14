class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def index 
    @users = User.all
    render :index
  end

  def create
    puts "User Params: #{user_params.inspect}" # Add this line for debugging
    @user = User.new(user_params)
    puts "User: #{@user.inspect}" # Add this line for debugging
  
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  

  def show 
    @user = User.find(params[:id])
    render :show
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password)
  end
  
  
end
