# Rails.application.routes.draw do
# # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
# end
Rails.application.routes.draw do
  # resources :dashboard, :only => [:index]
  # mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # devise_for :users
end

Dir.glob(File.expand_path("#{Rails.root}/config/routes/**.rb", __FILE__)).each do |file|
  instance_eval(File.read(file))
end