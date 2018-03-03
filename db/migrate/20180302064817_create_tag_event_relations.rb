class CreateTagEventRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :tag_event_relations do |t|
      t.references :tag
      t.references :event

      t.timestamps
    end
  end
end
