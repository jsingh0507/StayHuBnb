json.array! @listings do |listing|
    json.extract! listing, :id, :title, :description, :price, :wifi, :pet_friendly, :air_conditioning, :heating, :amenities, :latitude, :longitude, :address, :host_id, :created_at, :updated_at
    json.photoUrl listing.cover_photo.attached? ? listing.cover_photo.url : nil
end
