@reservations.each do |reservation|
  json.set! reservation.id do 
    json.extract! reservation, :id, :user_id, :listing_id, :start_date, :end_date, :guest, :created_at, :updated_at
    json.price reservation.listing.price
    json.title reservation.listing.title
  end
end