# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'


ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Video.destroy_all 
  Comment.destroy_all


  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  user1 = User.create!(
    first_name: 'Demo',
    last_name: 'User',
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  Video.create!(
    title: "Introduction to Rails", 
    description: "Learn the basics of Rails in this introductory video.", 
    user_id: user1.id, 
    views: 100, 
    likes: 20, 
    dislikes: 5
  )

  # Create 10 random users
  10.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    username = Faker::Internet.username(specifier: "#{first_name} #{last_name}", separators: %w(. _ -))
    email = Faker::Internet.email(name: username)
    password = Faker::Internet.password(min_length: 8)
    User.create!(first_name: first_name, last_name: last_name, username: username, email: email, password: password)
  end

  puts "Seeded #{User.count} users."

  # Create 20 random videos
  users = User.all
  video_files = Dir[Rails.root.join('db', 'seeds', 'videos', '*')]
  videoFile = URI.open("https://tubeyou-dev.s3.amazonaws.com/cleaned.mp4")

  10.times do
    title = Faker::Lorem.sentence(word_count: 3)
    description = Faker::Lorem.paragraph
    user = users.sample
    views = rand(0..10000)
    likes = rand(0..1000)
    dislikes = rand(0..100)

    video = Video.create!(title: title, description: description, user: user, views: views, likes: likes, dislikes: dislikes)

    video.video_file.attach(io: videoFile, filename: "cleaned.mp4", content_type: "video/mp4")

    video.save!
  end
  
  puts "Seeded #{Video.count} videos."

  puts "Seeding comments..."

  # Create 20 comments for each video
  Video.all.each do |video|
    5.times do
      Comment.create!(
        content: Faker::Lorem.sentence(word_count: 10),
        author_id: User.pluck(:id).sample,
        video_id: video.id
      )
    end
  end

  puts "Seeded #{Comment.count} comments."

  puts "Done!"
end