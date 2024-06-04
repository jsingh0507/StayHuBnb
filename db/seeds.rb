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
    # listing1.cover_photo.attach(io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/cover.jpg"), filename: "cover.png")
    listing1.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing1_1.jpg"), filename: "listing1_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing1_2.jpg"), filename: "listing1_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing1_3.jpg"), filename: "listing1_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing1_4.jpg"), filename: "listing1_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing1_5.jpg"), filename: "listing1_5.jpg" }
    ])

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

    listing2.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing2_1.jpg"), filename: "listing2_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing2_2.jpg"), filename: "listing2_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing2_3.jpg"), filename: "listing2_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing2_4.jpg"), filename: "listing2_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing2_5.jpg"), filename: "listing2_5.jpg" }
    ])

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
    listing3.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing3_1.jpg"), filename: "listing3_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing3_2.jpg"), filename: "listing3_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing3_3.jpg"), filename: "listing3_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing3_4.jpg"), filename: "listing3_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing3_5.jpg"), filename: "listing3_5.jpg" }
    ])

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
    listing4.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing4_1.jpg"), filename: "listing4_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing4_2.jpg"), filename: "listing4_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing4_3.jpg"), filename: "listing4_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing4_4.jpg"), filename: "listing4_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing4_5.jpg"), filename: "listing4_5.jpg" }
    ])

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
    listing5.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing5_1.jpg"), filename: "listing5_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing5_2.jpg"), filename: "listing5_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing5_3.jpg"), filename: "listing5_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing5_4.jpg"), filename: "listing5_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing5_5.jpg"), filename: "listing5_5.jpg" }
    ])

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
    listing6.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing6_1.jpg"), filename: "listing6_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing6_2.jpg"), filename: "listing6_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing6_3.jpg"), filename: "listing6_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing6_4.jpg"), filename: "listing6_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing6_5.jpg"), filename: "listing6_5.jpg" }
    ])

    listing7 = Listing.create!(
      title: 'Penthouse Suite',
      description: 'A luxurious penthouse with stunning city views.',
      price: 600.00,
      wifi: true,
      pet_friendly: false,
      air_conditioning: true,
      heating: true,
      amenities: 'Private Elevator, Rooftop Pool, Concierge Service',
      latitude: 34.0522,
      longitude: -118.2437,
      address: '104 Sky High Ave',
      host: user1
    )
    listing7.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing7_1.jpg"), filename: "listing7_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing7_2.jpg"), filename: "listing7_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing7_3.jpg"), filename: "listing7_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing7_4.jpg"), filename: "listing7_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing7_5.jpg"), filename: "listing7_5.jpg" }
    ])

    listing8 = Listing.create!(
      title: 'Country Cottage',
      description: 'A charming cottage in the countryside.',
      price: 180.00,
      wifi: false,
      pet_friendly: true,
      air_conditioning: false,
      heating: true,
      amenities: 'Garden, Fireplace, Parking',
      latitude: 51.5074,
      longitude: -0.1278,
      address: '105 Rural Road',
      host: user2
    )
    listing8.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_1.jpg"), filename: "listing8_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_2.jpg"), filename: "listing8_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_3.jpg"), filename: "listing8_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_4.jpg"), filename: "listing8_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_5.jpg"), filename: "listing8_5.jpg" }
    ])

  puts "Done!"

# end