class CreatePlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :places do |t|
      t.string :name
      t.string :street_address
      t.string :latitude
      t.string :longitude
      t.references :owner
      t.references :image

      t.timestamps
    end
  end
end
