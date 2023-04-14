Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:create, :show, :index, :update]
    get '/videos/random', to: 'videos#random'
    resources :videos, only: [:create, :show, :index, :update, :destroy] do 
      resources :comments, only: [:create, :show, :index, :update, :destroy]
      resources :likes, only: [:create, :show, :destroy, :index], param: :liker_id
    end
  end
  

  get '*path', to: 'static_pages#frontend_index', constraints: ->(request) { !request.xhr? && request.format.html? }

end
