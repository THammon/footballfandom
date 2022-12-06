class RivalriesController < ApplicationController
    skip_before_action :authorize, only: :index
    def index
        render json: Rivalry.all, status: :ok
    end

    def show
        render json: find_riv, status: :ok
    end

    def create
        render json: Rivalry.create!(riv_params), status: :created
    end

    private

    def find_riv
        Rivalry.find(params[:id])
    end
    
    def riv_params
        params.permit(:rival_team, :rival_logo)
    end
end