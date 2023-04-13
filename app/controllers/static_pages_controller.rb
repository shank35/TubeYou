# app/controllers/static_pages_controller.rb

class StaticPagesController < ActionController::Base
  def frontend_index
    render file: Rails.root.join('public', 'index.html'), layout: false
  end
end
