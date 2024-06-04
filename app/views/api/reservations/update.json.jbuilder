json.extract! @reservation, :id, :user_id, :listing_id, :start_date, :end_date, :guest, :created_at, :updated_at
json.price @reservation.listing.price
