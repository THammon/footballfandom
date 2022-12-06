class CreateFields < ActiveRecord::Migration[6.1]
  def change
    create_table :fields do |t|
      t.string :field_name
      t.string :team_name
      t.integer :visit
      t.string :field_image
      t.string :team_image
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :conference, null: false, foreign_key: true
      t.belongs_to :rivalry, null: false, foreign_key: true

      t.timestamps
    end
  end
end
