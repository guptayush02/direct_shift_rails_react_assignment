Rails.application.routes.draw do
  root 'home#index'

  get 'user/index'
  post 'signup', to: 'user#create'
  get 'login', to: 'user#login'
  # root 'components#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end