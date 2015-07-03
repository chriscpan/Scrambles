Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :words, only: [:index]
  end
  root :to => "root#root"
end
