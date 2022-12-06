class FieldSerializer < ActiveModel::Serializer
  attributes :id, :field_name, :team_name, :visit, :team_image, :field_image
  has_one :user
  has_one :conference
  has_one :rivalry
end
