class RecipesController < ApplicationController

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      params[:ingrArr].each do |ingredient|
        @recipe.
      end

    respond_to do |format|
    format.json {render json: current_user}
    format.html
    end
  end

private
  def recipe_params
    params.require(:recipe).permit(:method, :dilute)
  end

  def ingredient_params
    params.require(:ingredient).permit(:name, :volume, :abv)
  end
end
