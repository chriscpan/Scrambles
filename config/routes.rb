Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :words, only: [:index]
    resources :scores, only: [:index, :create]
  end
  root :to => "root#root"
end
