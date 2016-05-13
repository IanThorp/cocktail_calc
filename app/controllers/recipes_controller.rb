class RecipesController < ApplicationController

  def create
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

  def api
    recipe_id = params[:recipe_id]
    @recipe = Recipe.find(recipe_id)
    @ingredients_recipes = @recipe.ingredients_recipes
    @ingredients = @recipe.ingredients

    @recipe_data = {
      method: @recipe.method,
      dilute: @recipe.dilute,
      name: @recipe.name
    }

    @rows = {}
    @ingredients.each do |ingredient|
      @index = @ingredients.index(ingredient).to_s
      @ingredients_recipe = IngredientsRecipe.find_by(ingredient_id: ingredient.id, recipe_id: @recipe.id)
      @rows[@index] = {
        abv: ingredient[:abv],
        name: ingredient[:name],
        unit: @ingredients_recipe[:unit],
        volume: @ingredients_recipe[:volume]
      }
    end

    render json: [@recipe_data, @rows]
  end


  def show
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
