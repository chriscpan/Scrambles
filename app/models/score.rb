class Score < ActiveRecord::Base
  validates :name, :points, presence: true
  validates :name, length: {maximum: 15}
end
