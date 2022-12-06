class ConferenceSerializer < ActiveModel::Serializer
  attributes :id, :name, :image
  has_many :fields
  has_many :users
end
