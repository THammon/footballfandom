class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        render json: User.all, status: :ok
    end

    def show
        render json: find_user, status: :ok
    end

    # for autologin feat
    def me
        render json: @current_user
    end

     # modified for signup feat
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :username, :password)
    end

    def find_user
        User.find(params[:id])
    end
end

