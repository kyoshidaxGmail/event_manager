Rails.application.routes.draw do
  resources :dashboard, :only => [:index] do
    collection do
      get :map
    end
  end
  resources :calendar, :only => [:index] do
  end
  resources :events, :only => [:index, :show] do
  end
  resources :places, :only => [:index, :show] do
  end
end
