# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

100.times do
  Ingredient.create(name: Faker::Hipster.word, abv: Faker::Commerce.price)
end

methods = ["stir", "shake", "build"]
100.times do
  Recipe.create(name: Faker::Superhero.name, dilute: Faker::Boolean.boolean, method: methods.sample, user_id: 1)
end

500.times do
  IngredientsRecipe.create(ingredient_id: rand(1..100), recipe_id: rand(1..100), volume: rand(1..50).to_s)
end