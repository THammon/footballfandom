class UserFieldsController < ApplicationController
    def index
        fields= @current_user.user_fields
        render json: fields, include: ["user", "field", "field.rivalry"]
    end

    def create
        field = UserField.create!(field_id: params[:field_id], user: @current_user, visited: params[:visited])
        render json: field
    end

    def destroy
        UserField.find_by(field_id: params[:id], user_id: @current_user.id).destroy
        head :no_content
    end

end
