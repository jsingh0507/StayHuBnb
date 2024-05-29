# == Schema Information
#
# Table name: listings
#
#  id               :bigint           not null, primary key
#  title            :string           not null
#  description      :text             not null
#  price            :decimal(, )      not null
#  wifi             :boolean          default(FALSE)
#  pet_friendly     :boolean          default(FALSE)
#  air_conditioning :boolean          default(FALSE)
#  heating          :boolean          default(FALSE)
#  amenities        :text
#  latitude         :decimal(, )
#  longitude        :decimal(, )
#  address          :string           not null
#  host_id          :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Listing < ApplicationRecord

    validates :title, presence: true, length: {maximum: 255}
    validates :description, presence: true
    validates :price, presence: true, numericality: { greater_than: 0 }
    validates :wifi, inclusion: {in: [true, false]}
    validates :pet_friendly, inclusion: {in: [true, false]}
    validates :air_conditioning, inclusion: {in: [true, false]}
    validates :heating, inclusion: {in: [true, false]}
    validates :latitude, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }, allow_nil: true
    validates :longitude, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }, allow_nil: true
    validates :address, presence: true, length: {maximum: 255}

    belongs_to :host, 
        foreign_key: :host_id,
        class_name: 'User'

    # has_many :reservations, 
    #     dependent: :destroy
    # has_many :reviews, 
    #     dependent: :destroy
end
