Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get 'about', to: 'pages#about'
  
  # Full initial routes access
  # resources :contacts
  
  # Limited routes to two options only
  # resources :contacts, only: [:new, :create]
  
  # Refactored to limit to create action only
  resources :contacts, only: :create
  # Refactored links to show to contact-us instead of contact/new
  get 'contact-us', to: 'contacts#new', as: 'new_contact'
end