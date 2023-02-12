Rails.application.routes.draw do
  root 'home#index'

  post 'signup', to: 'user#create'
  post 'signin', to: 'user#signin'
  get 'login', to: 'user#login'
  # root 'components#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
