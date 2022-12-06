class Field < ApplicationRecord
  belongs_to :user
  belongs_to :conference
  belongs_to :rivalry
  has_many :user_fields
end
