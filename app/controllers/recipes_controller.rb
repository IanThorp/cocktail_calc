class RecipesController < ApplicationController

  def create
    p 'This WORKED'
    recipe_data = JSON.parse(params[:recipe])
    @recipe = Recipe.new(user_id: current_user.id, name: "Buster Brown", dilute: recipe_data["dilute"], method: recipe_data["method"])
    if @recipe.save
      recipe_data["ingrArr"].each { |ingr| match_ingredient(ingr) }
    end

    respond_to do |format|
    format.json {render json: @recipe}
    format.html
    end
  end

  def index
    @user = User.find(params[:user_id])
    @recipes = Recipe.where(user_id: @user.id)
  end

private
  def match_ingredient(ingredient)
    @matching_ing = Ingredient.where(name: ingredient["name"], abv: ingredient["abv"])
    if @matching_ing.length == 0
      @matching_ing << Ingredient.create(name: ingredient["name"], abv: ingredient["abv"])
    end
      IngredientsRecipe.create(recipe_id: @recipe.id ,ingredient_id: @matching_ing.first.id, volume: ingredient["volume"], unit: ingredient["unit"])
  end

  def recipe_params
    params.require(:recipe).permit(:method, :dilute)
  end

  def ingredient_params
    params.require(:ingredient).permit(:name, :abv)
  end
end
