class CreateTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :name
      t.text :description
      t.references :owner

      t.timestamps
    end
  end
end
