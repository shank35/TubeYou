# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'

# ApplicationRecord.transaction do 
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
    # first_name: 'Demo',
    # last_name: 'User',
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  user2 = User.create!(
    # first_name: 'Shan',
    # last_name: 'Kim',
    username: 'shank35', 
    email: 'shank35@gmail.com', 
    password: 'password'
  )

  user3 = User.create!(
    # first_name: 'Sean',
    # last_name: 'Name',
    username: 'sean-a99', 
    email: 'seana99@gmail.com', 
    password: 'password'
  )

  user4 = User.create!(
    # first_name: 'Gary',
    # last_name: 'Name',
    username: 'g-hor', 
    email: 'garyhor@gmail.com', 
    password: 'password'
  )

  puts "Seeded #{User.count} users."

  puts "Seeding videos..."

  video1 = Video.create!(
    title: "Haikyuu highlights", 
    description: "Haikyuuuuu!!!!", 
    user_id: user1.id, 
    views: 100, 
    likes: [], 
    dislikes: 5
  )

  video2 = Video.create!(
    title: "Kobe Highlights", 
    description: "Watch Kobe highlights", 
    user_id: user1.id, 
    views: rand(0..10000), 
    likes: [], 
    dislikes: rand(0..100)
  )

  video3 = Video.create!(
    title: "Kobe's Last Game", 
    description: "Watch Kobe's last game", 
    user_id: user2.id, 
    views: rand(0..10000), 
    likes: [], 
    dislikes: rand(0..100)
  )

  video4 = Video.create!(
    title: "Lebron Dunk", 
    description: "LeBron James throws down windmill dunk on fastbreak vs Celtics", 
    user_id: user2.id, 
    views: rand(0..10000), 
    likes: [], 
    dislikes: rand(0..100)
  )

  video5 = Video.create!(
    title: "Another Lebron Dunk", 
    description: "Lebron dunks", 
    user_id: user3.id, 
    views: rand(0..10000), 
    likes: [], 
    dislikes: rand(0..100)
  )

  video6 = Video.create!(
    title: "I Cleaned The World’s Dirtiest Beach #TeamSeas", 
    description: "Mr. Beast cleans a beach", 
    user_id: user3.id, 
    views: rand(0..10000), 
    likes: [], 
    dislikes: rand(0..100)
  )

  video7 = Video.create!(
    title: "BLACKPINK - ‘Pretty Savage’ 1011 SBS Inkigayo", 
    description: "[BLACKPINK - ‘Pretty Savage’ 1011 SBS Inkigayo]", 
    user_id: user4.id, 
    views: rand(0..10000), 
    likes: [], 
    dislikes: rand(0..100)
  )

  video8 = Video.create!(
    title: "21 Savage, Offset, Metro Boomin - Ric Flair Drip (Official Music Video)", 
    description: "Ric Flair Drip", 
    user_id: user4.id, 
    views: rand(0..10000), 
    likes: [], 
    dislikes: rand(0..100)
  )

  # video_files = Dir[Rails.root.join('db', 'seeds', 'videos', '*')]

  videoFile1 = URI.open("https://tubeyou-dev.s3.amazonaws.com/Best+Highlights+of+Hinata+Shoyo+against+Inarizaki+_+Haikyuu+To+The+Top+Part+2.mp4")
  videoFile2 = URI.open("https://tubeyou-dev.s3.amazonaws.com/kobe_highlights.mp4")
  videoFile3 = URI.open("https://tubeyou-dev.s3.amazonaws.com/kobe_last_game.mp4")
  videoFile4 = URI.open("https://tubeyou-dev.s3.amazonaws.com/LeBron+James+throws+down+windmill+dunk+on+fastbreak+vs+Celtics.mp4")
  videoFile5 = URI.open("https://tubeyou-dev.s3.amazonaws.com/lebron_dunk.mp4")
  videoFile6 = URI.open("https://tubeyou-dev.s3.amazonaws.com/mrbeast_clean.mp4")
  videoFile7 = URI.open("https://tubeyou-dev.s3.amazonaws.com/pretty_savage.mp4")
  videoFile8 = URI.open("https://tubeyou-dev.s3.amazonaws.com/ric_flair_drip.mp4")

  # thumbnailFile1 = URI.open("")
  # thumbnailFile2 = URI.open("")
  # thumbnailFile3 = URI.open("")
  # thumbnailFile4 = URI.open("")
  # thumbnailFile5 = URI.open("")
  # thumbnailFile6 = URI.open("")
  # thumbnailFile7 = URI.open("")
  # thumbnailFile8 = URI.open("")

  # video1.thumbnail.attach(io: thumbnail1, filename: "thumbnail1.jpg", content_type: "image/jpeg")
  # video2.thumbnail.attach(io: thumbnail2, filename: "thumbnail2.jpg", content_type: "image/jpeg")
  # video3.thumbnail.attach(io: thumbnail3, filename: "thumbnail3.jpg", content_type: "image/jpeg")
  # video4.thumbnail.attach(io: thumbnail4, filename: "thumbnail4.jpg", content_type: "image/jpeg")
  # video5.thumbnail.attach(io: thumbnail5, filename: "thumbnail5.jpg", content_type: "image/jpeg")
  # video6.thumbnail.attach(io: thumbnail6, filename: "thumbnail6.jpg", content_type: "image/jpeg")
  # video7.thumbnail.attach(io: thumbnail7, filename: "thumbnail7.jpg", content_type: "image/jpeg")
  # video8.thumbnail.attach(io: thumbnail8, filename: "thumbnail8.jpg", content_type: "image/jpeg")

  video1.video_file.attach(io: videoFile1, filename: "Best+Highlights+of+Hinata+Shoyo+against+Inarizaki+_+Haikyuu+To+The+Top+Part+2.mp4", content_type: "video/mp4")
  video2.video_file.attach(io: videoFile2, filename: "kobe_highlights.mp4", content_type: "video/mp4")
  video3.video_file.attach(io: videoFile3, filename: "kobe_last_game.mp4", content_type: "video/mp4")
  video4.video_file.attach(io: videoFile4, filename: "LeBron+James+throws+down+windmill+dunk+on+fastbreak+vs+Celtics.mp4", content_type: "video/mp4")
  video5.video_file.attach(io: videoFile5, filename: "lebron_dunk.mp4", content_type: "video/mp4")
  video6.video_file.attach(io: videoFile6, filename: "mrbeast_clean.mp4", content_type: "video/mp4")
  video7.video_file.attach(io: videoFile7, filename: "pretty_savage.mp4", content_type: "video/mp4")
  video8.video_file.attach(io: videoFile8, filename: "ric_flair_drip.mp4", content_type: "video/mp4")

  puts "Seeded #{Video.count} videos."

  puts "Seeding likes..."

  # Liking video1
  Like.create!(
    liker_id: user1.id,
    video_id: video1.id,
    liked: true,
  )

  Like.create!(
    liker_id: user2.id,
    video_id: video1.id,
    liked: false,
  )

  Like.create!(
    liker_id: user3.id,
    video_id: video1.id,
    liked: true,
  )

  Like.create!(
    liker_id: user4.id,
    video_id: video1.id,
    liked: true,
  )

  # Liking video2

  Like.create!(
    liker_id: user1.id,
    video_id: video2.id,
    liked: true,
  )

  Like.create!(
    liker_id: user2.id,
    video_id: video2.id,
    liked: true,
  )

  Like.create!(
    liker_id: user3.id,
    video_id: video2.id,
    liked: true,
  )

  Like.create!(
    liker_id: user4.id,
    video_id: video2.id,
    liked: true,
  )

  # Liking video3

  Like.create!(
    liker_id: user1.id,
    video_id: video3.id,
    liked: true,
  )

  Like.create!(
    liker_id: user2.id,
    video_id: video3.id,
    liked: true,
  )

  Like.create!(
    liker_id: user3.id,
    video_id: video3.id,
    liked: true,
  )

  Like.create!(
    liker_id: user4.id,
    video_id: video3.id,
    liked: false,
  )

  # Liking video4
  Like.create!(
    liker_id: user1.id,
    video_id: video4.id,
    liked: true,
  )

  Like.create!(
    liker_id: user2.id,
    video_id: video4.id,
    liked: true,
  )

  Like.create!(
    liker_id: user3.id,
    video_id: video4.id,
    liked: true,
  )

  Like.create!(
    liker_id: user4.id,
    video_id: video4.id,
    liked: true,
  )

  # Liking video5
  Like.create!(
    liker_id: user1.id,
    video_id: video5.id,
    liked: true,
  )

  Like.create!(
    liker_id: user2.id,
    video_id: video5.id,
    liked: false,
  )

  Like.create!(
    liker_id: user3.id,
    video_id: video5.id,
    liked: true,
  )

  Like.create!(
    liker_id: user4.id,
    video_id: video5.id,
    liked: false,
  )

  # Liking video6
  Like.create!(
    liker_id: user1.id,
    video_id: video6.id,
    liked: false,
  )

  Like.create!(
    liker_id: user2.id,
    video_id: video6.id,
    liked: true,
  )

  Like.create!(
    liker_id: user3.id,
    video_id: video6.id,
    liked: true,
  )

  Like.create!(
    liker_id: user4.id,
    video_id: video6.id,
    liked: true,
  )

  # Liking video7
  Like.create!(
    liker_id: user1.id,
    video_id: video7.id,
    liked: true,
  )

  Like.create!(
    liker_id: user2.id,
    video_id: video7.id,
    liked: false,
  )

  Like.create!(
    liker_id: user3.id,
    video_id: video7.id,
    liked: false,
  )

  Like.create!(
    liker_id: user4.id,
    video_id: video7.id,
    liked: true,
  )

  # Liking video8
  Like.create!(
    liker_id: user1.id,
    video_id: video8.id,
    liked: true,
  )

  Like.create!(
    liker_id: user2.id,
    video_id: video8.id,
    liked: false,
  )

  Like.create!(
    liker_id: user3.id,
    video_id: video8.id,
    liked: true,
  )

  Like.create!(
    liker_id: user4.id,
    video_id: video8.id,
    liked: true,
  )

  puts "Seeded #{Like.count} videos."

  puts "Seeding comments..."

  # Comments for video1 - "Introduction to Rails"
  Comment.create!(
    content: "This was the perfect introduction to Rails! Thanks for sharing!",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "I've been looking for a straightforward Rails tutorial, and this is it!",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "As a beginner, I found this video very helpful. Keep up the good work!",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "Clear and concise explanations – great job!",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "This is a game-changer for my Rails learning journey. Thank you!",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "Rails is such a powerful framework. Thanks for the intro!",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "Your teaching style is excellent. Subscribed!",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "Can't wait to build my first Rails app! Thanks for the inspiration.",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "I've learned more from this video than from hours of reading Rails documentation.",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )
  Comment.create!(
    content: "Great introduction! Looking forward to more advanced topics in the future.",
    author_id: User.pluck(:id).sample,
    video_id: video1.id
  )

  # Comments for video2 - "Kobe Highlights"
  Comment.create!(
    content: "Kobe was a true legend. These highlights always give me chills.",
    author_id: User.pluck(:id).sample,
    video_id: video2.id
  )
  Comment.create!(
    content: "One of the greatest players of all time. RIP Kobe.",
    author_id: User.pluck(:id).sample,
    video_id: video2.id
  )
  Comment.create!(
    content: "I could watch Kobe's highlights all day. Thanks for sharing!",
    author_id: User.pluck(:id).sample,
    video_id: video2.id
  )
  Comment.create!(
    content: "Kobe's work ethic and determination were unmatched. Truly inspiring.",
    author_id: User.pluck(:id).sample,
    video_id: video2.id
  )
  Comment.create!(
    content: "These highlights bring back so many memories. #MambaForever",
    author_id: User.pluck(:id).sample,
    video_id: video2.id
  )
  Comment.create!(
    content: "Kobe's footwork and shooting ability were incredible.",
    author_id: User.pluck(:id).sample,
    video_id: video2.id
  )
  Comment.create!(
    content: "I miss watching Kobe play. He was a true inspiration on and off the court.",
    author_id: User.pluck(:id).sample,
    video_id: video2.id
  )
  Comment.create!(
    content: "His passion for the game was undeniable. A true icon.",
    author_id: User.pluck(:id).sample,
    video_id: video2.id 
  )

  #Comments for video3 - "Kobe's Last Game"
  Comment.create!(
    content: "Kobe's last game was unforgettable. He went out with a bang!",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "60 points in his final game – only Kobe could do that.",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "I remember watching this live, and it still gives me goosebumps.",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "This game was a testament to Kobe's greatness.",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "The ultimate farewell performance. Mamba Out!",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "What a way to end an incredible career. RIP Kobe.",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "Kobe's last game was a rollercoaster of emotions.",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "I'll never forget this game. It was an honor to witness Kobe's greatness.",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "The atmosphere in that arena was electric. A fitting tribute to a legend.",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )
  Comment.create!(
    content: "Thank you for uploading this. It's always great to relive this iconic moment.",
    author_id: User.pluck(:id).sample,
    video_id: video3.id
  )

  # Comments for video4 - "Lebron Dunk"
  Comment.create!(
    content: "LeBron's athleticism is simply unmatched.",
    author_id: User.pluck(:id).sample,
    video_id: video4.id
  )
  Comment.create!(
    content: "This dunk was absolutely insane! I can't believe he pulled it off.",
    author_id: User.pluck(:id).sample,
    video_id: video4.id
  )
  Comment.create!(
    content: "The King showing everyone how it's done!",
    author_id: User.pluck(:id).sample,
    video_id: video4.id
  )
  Comment.create!(
    content: "I've watched this dunk a hundred times, and it never gets old.",
    author_id: User.pluck(:id).sample,
    video_id: video4.id
  )
  Comment.create!(
    content: "LeBron James: the human highlight reel.",
    author_id: User.pluck(:id).sample,
    video_id: video4.id
  )
  Comment.create!(
    content: "This dunk is just one of the many reasons LeBron is considered one of the GOATs.",
    author_id: User.pluck(:id).sample,
    video_id: video4.id
  )
  Comment.create!(
    content: "The power and grace in this dunk are incredible.",
    author_id: User.pluck(:id).sample,
    video_id: video4.id
  )
  Comment.create!(
    content: "This is one of the best dunks I've ever seen. LeBron is a beast!",
    author_id: User.pluck(:id).sample,
    video_id: video4.id
  )

  #Comments for video5 - "Another Lebron Dunk"
  Comment.create!(
    content: "LeBron's dunks never fail to impress!",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "He defies gravity with every jump. Truly amazing!",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "This is why they call him King James!",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "I could watch LeBron dunks all day long.",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "LeBron's athleticism is unparalleled. What a dunk!",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "Another iconic dunk from the King!",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "LeBron's energy and power are absolutely incredible.",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "One of my favorite LeBron dunks!",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "This dunk just shows how dominant LeBron is on the court.",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )
  Comment.create!(
    content: "LeBron James: the ultimate highlight machine.",
    author_id: User.pluck(:id).sample,
    video_id: video5.id
  )

  # Comments for video6 - "I Cleaned The World’s Dirtiest Beach #TeamSeas"
  Comment.create!(
    content: "Amazing initiative! Thank you for raising awareness and making a difference.",
    author_id: User.pluck(:id).sample,
    video_id: video6.id
  )
  Comment.create!(
    content: "This is so inspiring! We need more people like you.",
    author_id: User.pluck(:id).sample,
    video_id: video6.id
  )
  Comment.create!(
    content: "Great job, Mr. Beast! Let's all do our part to save the planet.",
    author_id: User.pluck(:id).sample,
    video_id: video6.id
  )
  Comment.create!(
    content: "Thank you for using your platform to make a positive impact on the environment.",
    author_id: User.pluck(:id).sample,
    video_id: video6.id
  )
  Comment.create!(
    content: "This video is a wake-up call for all of us. Let's clean our beaches and oceans!",
    author_id: User.pluck(:id).sample,
    video_id: video6.id
  )
  Comment.create!(
    content: "I love seeing influencers taking action for a better world.",
    author_id: User.pluck(:id).sample,
    video_id: video6.id
  )
  Comment.create!(
    content: "Keep up the good work! You're making a huge difference.",
    author_id: User.pluck(:id).sample,
    video_id: video6.id
  )
  Comment.create!(
    content: "This is a great reminder that we all need to do our part to protect the environment.",
    author_id: User.pluck(:id).sample,
    video_id: video6.id
  )

  # Comments for video7 - "BLACKPINK - ‘Pretty Savage’ 1011 SBS Inkigayo"
  Comment.create!(
    content: "BLACKPINK never disappoints! Their performances are always top-notch.",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "Pretty Savage is such a great song, and they totally nailed this performance!",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "Their stage presence is absolutely incredible. BLACKPINK in your area!",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "The girls always give their all in every performance. So much talent!",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "BLACKPINK's energy and charisma are unmatched.",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "This performance is amazing! Can't get enough of Pretty Savage.",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "Each member brings something unique to the group. Love them!",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "They always look so stunning and confident on stage.",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "BLACKPINK keeps proving why they're one of the top K-pop groups.",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )
  Comment.create!(
    content: "The choreography and vocals are on point, as always!",
    author_id: User.pluck(:id).sample,
    video_id: video7.id
  )

  # Comments for video8 - "21 Savage, Offset, Metro Boomin - Ric Flair Drip (Official Music Video)"
  Comment.create!(
    content: "This song is still a banger! Can't get enough of that Ric Flair Drip.",
    author_id: User.pluck(:id).sample,
    video_id: video8.id
  )
  Comment.create!(
    content: "21 Savage, Offset, and Metro Boomin make an amazing team.",
    author_id: User.pluck(:id).sample,
    video_id: video8.id
  )
  Comment.create!(
    content: "The beat and flow of this song are just so addictive.",
    author_id: User.pluck(:id).sample,
    video_id: video8.id
  )
  Comment.create!(
    content: "Ric Flair's cameo in the video is legendary!",
    author_id: User.pluck(:id).sample,
    video_id: video8.id
  )
  Comment.create!(
    content: "This song never gets old. It's always on my playlist.",
    author_id: User.pluck(:id).sample,
    video_id: video8.id
  )
  Comment.create!(
    content: "The energy in this music video is just incredible.",
    author_id: User.pluck(:id).sample,
    video_id: video8.id
  )
  Comment.create!(
    content: "One of the best collaborations in recent years. Love it!",
    author_id: User.pluck(:id).sample,
    video_id: video8.id
  )

  puts "Seeded #{Comment.count} comments."

  puts "Done!"
# end