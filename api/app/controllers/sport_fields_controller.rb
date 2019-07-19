class SportFieldsController < ApplicationController

  def index
    render json: SportField.all
  end

  def create
    sport_field = SportField.new(sport_field_params)
    if sport_field.save
      render json: sport_field, status: :created
    else
      render json: { errors: sport_field.errors}, status: :unprocessable_entity
    end
  end

  def schedule
    @sport_field = SportField.find(params[:id])
    p params[:selectedDate]
    bookings = @sport_field.bookings.where("DATE(date) = ?", params[:selectedDate])
    club = @sport_field.club
    render json: {club: club, bookings: bookings}
  end


  private
  def sport_field_params
    params.permit(:name, :description, :price_day, :price_night, :image)
  end

end