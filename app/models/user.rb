# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  full_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :email, 
    uniqueness: true, 
    length: { in: 3..100 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :full_name, presence: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..40 }, allow_nil: true

  has_many :listings, 
    foreign_key: :host_id, 
    dependent: :destroy

  has_many :reservations, 
    dependent: :destroy

  before_validation :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      break token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
