# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      full_name: 'Demo Lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    User.create!(
      full_name: 'John Doe', 
      email: 'dodo123@user.io', 
      password: 'qwerty123'
    )

    User.create!(
      full_name: 'Jaspreet Singh', 
      email: 'jaspreet123@gmail.io', 
      password: 'password123'
    )
  
    puts "Done!"
  end