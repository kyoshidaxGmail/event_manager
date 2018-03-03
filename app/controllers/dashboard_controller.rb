class DashboardController < ApplicationController
  layout "dashboard"
  def index
    @places = Place.where(owner_id: 1)
    @tags = Tag.where(owner_id: 1)
    if params[:p].present?
      @place = @places.find(params[:p])
      @monitored_items = @place.monitored_items if @place.present?
    elsif params[:t].present?
      @tag = @tags.find(params[:t])
      @monitored_items = @tag.monitored_items if @tag.present?
    end
    @monitored_item = @monitored_items.find(params[:m]) if @monitored_items.present? && params[:m].present?
  end

  def map
    @places = Place.where(owner_id: 1)
    @tags = Tag.where(owner_id: 1)
  end
end
