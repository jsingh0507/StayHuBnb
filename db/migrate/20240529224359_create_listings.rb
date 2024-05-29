class CreateListings < ActiveRecord::Migration[7.1]
  def change
    create_table :listings do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.decimal :price, null: false
      t.boolean :wifi, default: false
      t.boolean :pet_friendly, default: false
      t.boolean :air_conditioning, default: false
      t.boolean :heating, default: false
      t.text :amenities
      t.decimal :latitude
      t.decimal :longitude
      t.string :address, null: false
      t.references :host, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
