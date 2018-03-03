class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.string :kind
      t.string :url

      t.references :place
      t.references :owner
      t.references :image

      t.date :start_day
      t.datetime :start_time
      t.date :end_day
      t.datetime :end_time

      t.integer :mumber_upper_limit
      t.datetime :application_deadline

      t.timestamps
    end
  end
end
