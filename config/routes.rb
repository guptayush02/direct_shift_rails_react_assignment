Rails.application.routes.draw do
  root 'home#index'

  get 'dashboard', to: 'dashboard#index'
  post 'refer', to: 'dashboard#refer'

  post 'signup', to: 'user#create'
  post 'signin', to: 'user#signin'
  get 'login', to: 'user#login'


end
