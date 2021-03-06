class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :places, :foreign_key => :owner_id, :dependent => :nullify
  has_many :events, :foreign_key => :owner_id, :dependent => :nullify
end
