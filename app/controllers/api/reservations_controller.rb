class Api::ReservationsController < ApplicationController
    before_action :set_reservation, only: [:show, :update, :destroy]
    before_action :require_logged_in

    def index
        @reservations = Reservation.all
        render :index
    end
    
    def show
        render :show
    end
    
    def create
        @reservation = Reservation.new(reservation_params)
        @reservation.user_id = current_user.id
        if @reservation.save
          render :index, status: :created
        else
          render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def update
        if @reservation.update(reservation_params)
          render :show
        else
          render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def destroy
        @reservation.destroy
    end
    
    private
    
    def set_reservation
        @reservation = Reservation.find(params[:id])
    end
    
    def reservation_params
        params.require(:reservation).permit(:listing_id, :start_date, :end_date, :guest)
    end

end