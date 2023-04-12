class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :liker, null: false, foreign_key: { to_table: :users }
      t.references :video, null: false, foreign_key: true
      t.boolean :liked, null: false, default: false
      t.timestamps
    end

    add_index :likes, [:liker_id, :video_id], unique: true
  end
end
