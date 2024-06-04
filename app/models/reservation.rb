# == Schema Information
#
# Table name: reservations
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  start_date :date             not null
#  end_date   :date             not null
#  guest      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Reservation < ApplicationRecord
    belongs_to :user
    belongs_to :listing
  
    validates :start_date, :end_date, :guest, presence: true
    validates :guest, numericality: { only_integer: true, greater_than: 0 }
    validate :end_date_after_start_date
  
    def end_date_after_start_date
      return if end_date.blank? || start_date.blank?
  
      if end_date <= start_date
        errors.add(:end_date, "must be after the start date")
      end
    end
  
    def total_price
      listing.price * (end_date - start_date).to_i
    end
end
