class Rivalry < ApplicationRecord
    has_many :fields
    has_many :users, through: :fields
end
