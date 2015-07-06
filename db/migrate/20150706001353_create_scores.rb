class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :name, null: false
      t.integer :points, null: false

      t.timestamps
    end
  end
end
