class UserFieldSerializer < ActiveModel::Serializer
  attributes :id, :visited, :field_id
  belongs_to :user
  belongs_to :field, serializer: FieldSerializer
end
