class CreateRivalries < ActiveRecord::Migration[6.1]
  def change
    create_table :rivalries do |t|
      t.string :rival_team
      t.string :rival_logo

      t.timestamps
    end
  end
end
