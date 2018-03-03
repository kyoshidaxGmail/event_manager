Rails.application.routes.draw do
  resources :try, :only => [:index] do
  end
end
