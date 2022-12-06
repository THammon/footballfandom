class FieldsController < ApplicationController
    
    skip_before_action :authorize, only: :index

    def index
        render json: Field.all, status: :ok
    end

    def show
        render json: find_fie, status: :ok
    end

    def create
        field = @current_user.fields.create!(field_params)
        render json: @current_user.fields, status: :created
    end

    def update
        find_fie.update!(field_params)
        render json: find_fie, status: :accepted
    end

    def destroy
        find_fie.destroy
        head :no_content
    end

    private

    def find_fie
        Field.find(params[:id])
    end

    def field_params
        params.permit(:field_name, :team_name, :visit, :field_image, :team_image, :user_id, :conference_id, :rivalry_id)
    end
end
