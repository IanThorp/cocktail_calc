class IngredientsController < ApplicationController

  def create
    @ingredient = Ingredient.new(ingredient_params)
    if @ingredient.save
      respond_to do |format|
        format.json {render json: @ingredient }
        format.html
      end
    else

    end
  end

  private
    def ingredient_params
        params.require(:ingredient).permit(:name, :abv)
    end
end
