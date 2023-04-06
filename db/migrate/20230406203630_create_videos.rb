class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.string :title, limit: 100, null: false
      t.text :description, limit: 5000
      t.references :user, null: false, foreign_key: true
      t.integer :views, default: 0
      t.integer :likes, default: 0
      t.integer :dislikes, default: 0
      t.timestamps
    end
  end
end
