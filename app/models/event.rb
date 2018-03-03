class Event < ApplicationRecord
  belongs_to :owner, :class_name => "User"

  belongs_to :place
  has_many :tag_event_relations
  has_many :tags, :through => :tag_event_relations
end
