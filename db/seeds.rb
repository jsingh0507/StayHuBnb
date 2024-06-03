require "open-uri"
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# ApplicationRecord.transaction do
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Listing.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('listings')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    user1 = User.create!(
      full_name: 'Demo Lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    user2 = User.create!(
      full_name: 'John Doe', 
      email: 'dodo123@user.io', 
      password: 'qwerty123'
    )

    user3 = User.create!(
      full_name: 'Jaspreet Singh', 
      email: 'jaspreet123@gmail.io', 
      password: 'password123'
    )

    puts "Creating listings..."
    # Create Listings
    listing1 = Listing.create!(
      title: 'Lakefront House',
      description: 'A house with beatiful lake view.',
      price: 150.00,
      wifi: true,
      pet_friendly: true,
      air_conditioning: true,
      heating: true,
      amenities: 'Kitchen, Parking, TV',
      latitude: 45.12345,
      longitude: -93.12345,
      address: '123 Country Lane',
      host: user1
    )
    listing1.cover_photo.attach(io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/cover.jpg"), filename: "cover.png")

    listing2 = Listing.create!(
      title: 'Modern Apartment',
      description: 'A city apratment with the perfect view.',
      price: 200.00,
      wifi: true,
      pet_friendly: false,
      air_conditioning: true,
      heating: true,
      amenities: 'Rooftop access, Pool, Gym',
      latitude: 40.7128,
      longitude: -74.0060,
      address: '456 City Street',
      host: user2
    )

    listing3 = Listing.create!(
      title: 'Beach House',
      description: 'Beeatiful beach view.',
      price: 300.00,
      wifi: true,
      pet_friendly: true,
      air_conditioning: true,
      heating: true,
      amenities: 'Beach Access, Pool, Kitchen',
      latitude: 34.0194,
      longitude: -118.4912,
      address: '789 Ocean Drive',
      host: user3
    )

    listing4 = Listing.create!(
      title: 'Cozy Cabin',
      description: 'Old school cabin in the mountain.',
      price: 120.00,
      wifi: false,
      pet_friendly: true,
      air_conditioning: false,
      heating: true,
      amenities: 'Fireplace, Hiking Trails',
      latitude: 39.7392,
      longitude: -104.9903,
      address: '101 Mountain Trail',
      host: user1
    )

    listing5 = Listing.create!(
      title: 'Luxury Villa',
      description: 'A luxurious villa with all the amenities.',
      price: 500.00,
      wifi: true,
      pet_friendly: true,
      air_conditioning: true,
      heating: true,
      amenities: 'Pool, Spa, Private Chef',
      latitude: 36.1699,
      longitude: -115.1398,
      address: '102 Luxury Lane',
      host: user2
    )

    listing6 = Listing.create!(
      title: 'Treehouse',
      description: 'A nice cozy treehouse',
      price: 220.00,
      wifi: false,
      pet_friendly: false,
      air_conditioning: false,
      heating: false,
      amenities: 'Bathroom lower level',
      latitude: 41.8781,
      longitude: -87.6298,
      address: '103 Hululu Blvd',
      host: user3
    )
    puts "Done!"

# end