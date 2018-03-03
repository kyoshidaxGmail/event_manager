class Place < ApplicationRecord
  belongs_to :owner, :class_name => "User"
  belongs_to :image, required: false
  has_many :events, :dependent => :destroy
end
