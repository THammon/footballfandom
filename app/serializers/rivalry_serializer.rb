class RivalrySerializer < ActiveModel::Serializer
  attributes :id, :rival_team, :rival_logo
  has_many :fields
  has_many :users
end
