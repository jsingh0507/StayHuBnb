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
    Reservation.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('listings')
    ApplicationRecord.connection.reset_pk_sequence!('reservations')
  
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
      title: 'EAGLE WATCH MALIBU- Architectural w/ Ocean View',
      description: 'Embodying everything your heart can conjure when dreaming upon the perfect lakefront vacation, this 3500 sq ft Grand Dame of the Poconos, with its stunning lake views in every direction, fresh off a complete remodel, is being offered to the public for the very first time.  From hot tubs, hammocks, kayaks & other peaceful places to relax, to game and groovy rooms meant for social shenanigans and fun, this mid-century beauty on the lake will be the talk of friends and family for years to come!.',
      price: 150.00,
      wifi: true,
      pet_friendly: true,
      air_conditioning: true,
      heating: true,
      amenities: 'WiFi,Parking,Pool,Kitchen,Bathub,Air Conditioning',
      latitude: 45.12345,
      longitude: -93.12345,
      address: 'Malibu, California',
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
      title: 'Stylish-Modern apartment in the heart of NYC',
      description: 'Beautiful space in a modern building with fantastic views. Very clean and up-to-date. The building is near Hudson Yards, Javits Center, Time Square. From the windows of our apartment you can see Hudson River, Statue of Liberty, and Empire State Building.',
      price: 200.00,
      wifi: true,
      pet_friendly: false,
      air_conditioning: true,
      heating: true,
      amenities: 'WiFi,Pool,Kitchen,Bathub,Air Conditioning',
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'New York, United States',
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
      title: 'Simplicity Off The Grid',
      description: 'Bring the whole family to this spacious, bright and comfortable home with lots of room for fun, a beautiful new pool, and plenty of deck views. Direct waterfront in the heart of the prestigious Sea Point. 
      * 25 years old or older to sign agreement
      * No bachelor/bachelorette parties, Senior Week or After prom parties.',
      price: 300.00,
      wifi: true,
      pet_friendly: true,
      air_conditioning: true,
      heating: true,
      amenities: 'WiFi,Parking,Pool,Kitchen,Air Conditioning',
      latitude: 34.0194,
      longitude: -118.4912,
      address: 'Cook Island, Florida',
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
      title: 'Lake Glenwood A-Frame w/stunning views',
      description: 'Welcome to the Enchanted A Frame, where every detail is hand crafted for your memorable trip to the Poconos.  Perfect for a romantic getaway, couple with 1 to 2 children, or individual escape for creativity.  When you are ready, you can hit the areas hiking trails or rally out to the slopes.',
      price: 120.00,
      wifi: false,
      pet_friendly: true,
      air_conditioning: false,
      heating: true,
      amenities: 'WiFi,Parking,Kitchen,Air Conditioning',
      latitude: 39.7392,
      longitude: -104.9903,
      address: 'Sussex, New Jersey',
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
      title: 'The Woodstock Barn House',
      description: 'PALuxuryRentals Presents "The Hawkview Retreat", 11 BR, Theater, Arcade, Swimming Pool, Hot Tubs, Mountain Views, Private Balconies - as Seen on TV.

      The perfect spot for your luxurious vacation with plenty of space to spread out across the estates’s 11 Bedrooms, Theater, Arcade, Gameroom and Estate. Spend your days gazing at the mountains, hawk-watching, relaxing in the heated pool, or hanging out in.',
      price: 500.00,
      wifi: true,
      pet_friendly: true,
      air_conditioning: true,
      heating: true,
      amenities: 'WiFi,Parking,Pool,Kitchen,Bathub',
      latitude: 36.1699,
      longitude: -115.1398,
      address: 'Woodstock, New York',
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
      title: 'Creekside Outdoor Adventure Paradise',
      description: 'Beautifully refinished Silo house on pristine Litchfield Hills estate!  The house features antique furnishings and great artwork throughout!

      Guests have access to the entire 170+ acre property which features a covered bridge, beautifully manicured landscape and breathtaking views. In the warmer months guests can enjoy swimming and kayaking in our private pond.',
      price: 220.00,
      wifi: false,
      pet_friendly: false,
      air_conditioning: false,
      heating: false,
      amenities: 'WiFi,Parking,Kitchen,Bathub',
      latitude: 41.8781,
      longitude: -87.6298,
      address: 'Old Fort, North Carolina',
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
      title: 'Beautiful Penthouse Suite with skyline views!',
      description: 'Enjoy a stylish experience at this centrally-located place!
      Penthouse Suite provides amazing skyline views of the Manhattan Bridge. Located in central DUMBO, this spectacular space is a perfect addition to any NYC getaway!
      ***please note that the neighbouring property has an event space, so occasional events are possible ***',
      price: 600.00,
      wifi: true,
      pet_friendly: false,
      air_conditioning: true,
      heating: true,
      amenities: 'WiFi,Parking,Pool,Kitchen,Bathub,Air Conditioning',
      latitude: 34.0522,
      longitude: -118.2437,
      address: 'Brooklyn, New York',
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
      title: 'Lost Ridge - Luxury Tiny House w/ Stunning Views!',
      description: 'Enter the main level from the parking area up just 4 steps to a large deck. The front door opens into the spacious great room which features a wood burning fireplace between 14-foot tall windows allowing all the natural light and open, airy feeling you could ever want. The floor to ceiling windows make you feel that you are truly a part of the surrounding landscape while offering stunning, unobstructed mountain views. ',
      price: 180.00,
      wifi: false,
      pet_friendly: true,
      air_conditioning: false,
      heating: true,
      amenities: 'WiFi,Parking,Kitchen,Air Conditioning',
      latitude: 51.5074,
      longitude: -0.1278,
      address: 'Lenoir, North Carolina',
      host: user2
    )
    listing8.photos.attach([
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_1.jpg"), filename: "listing8_1.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_2.jpg"), filename: "listing8_2.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_3.jpg"), filename: "listing8_3.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_4.jpg"), filename: "listing8_4.jpg" },
      { io: URI.open("https://stayhubnb-seeds.s3.amazonaws.com/listing8_5.jpg"), filename: "listing8_5.jpg" }
    ])

    puts "Creating reservations..."
    # Create Reservations
    reservation1 = Reservation.create!(
      listing: listing1,
      user: user2,
      start_date: Date.today,
      end_date: Date.today + 3.days,
      guest: 2
    )

    reservation2 = Reservation.create!(
      listing: listing2,
      user: user3,
      start_date: Date.today + 5.days,
      end_date: Date.today + 8.days,
      guest: 3
    )

    reservation3 = Reservation.create!(
      listing: listing3,
      user: user1,
      start_date: Date.today + 10.days,
      end_date: Date.today + 15.days,
      guest: 4
    )

    reservation4 = Reservation.create!(
      listing: listing4,
      user: user1,
      start_date: Date.today + 5.days,
      end_date: Date.today + 8.days,
      guest: 1
    )

    reservation5 = Reservation.create!(
      listing: listing5,
      user: user1,
      start_date: Date.today + 5.days,
      end_date: Date.today + 8.days,
      guest: 6
    )


  puts "Done!"

# end