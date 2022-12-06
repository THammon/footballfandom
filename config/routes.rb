Rails.application.routes.draw do
  
  resources :fields
  resources :user_fields
  resources :users
  resources :rivalries, only: [:index, :show, :create]
  resources :conferences, only: [:index, :show, :create]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # signup/login/logout
  post "/signup", to: "users#create"
  get "/me", to: "users#me"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
