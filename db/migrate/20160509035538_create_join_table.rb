class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :ingredients, :recipes do |t|
      t.index [:ingredient_id, :recipe_id]
      t.index [:recipe_id, :ingredient_id]
      t.string :volume

    end
  end
end
