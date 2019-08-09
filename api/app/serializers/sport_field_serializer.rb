class SportFieldSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :description, :image, :price_day, :price_night, :club_id

  def image
    object.image.service_url if self.object.image.attached?
  end
end
