class Tag < ApplicationRecord
  belongs_to :owner, :class_name => "User"
  has_many :tag_event_relations
  has_many :events, :through => :tag_event_relations
end
