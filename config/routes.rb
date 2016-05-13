Rails.application.routes.draw do


  resources :users do
    get 'recipes/:id/api' => 'recipes#api'
    resources :recipes, only: [:create, :edit, :delete, :index, :show] do
      resources :ingredients, only: [:create, :delete]
    end
  end


  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'

  get 'welcome/index'

  get '/signup' => 'users#new'

  root 'welcome#index'

end
