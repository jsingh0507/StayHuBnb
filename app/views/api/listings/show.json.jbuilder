json.extract! @listing, :id, :title, :description, :price, :wifi, :pet_friendly, :air_conditioning, :heating, :amenities, :latitude, :longitude, :address, :host_id, :created_at, :updated_at

json.host do
  json.id @listing.host.id
  json.full_name @listing.host.full_name
  json.email @listing.host.email
end