Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :words
  end
  root :to => "root#root"
end
