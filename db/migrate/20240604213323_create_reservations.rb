class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.bigint :user_id, null: false, index: true
      t.bigint :listing_id, null: false, index: true
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :guest, null: false

      t.index [:user_id, :listing_id], unique: true

      t.foreign_key :users, column: :user_id
      t.foreign_key :listings, column: :listing_id
      
      t.timestamps
    end
  end
end
