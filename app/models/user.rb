class User < ApplicationRecord
    has_many :fields, dependent: :destroy
    has_many :conferences, through: :fields
    has_many :rivalries, through: :fields
    # validates_presence_of :username, :first_name, :last_name
    validates :username, length: { in: 0..15 }, uniqueness: true, presence: true
    # validates :first_name, presence: true
    # validates :last_name, presence: true
    has_secure_password
    has_many :user_fields
end
