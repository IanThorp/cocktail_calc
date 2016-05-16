
user = User.new(email: "tom@tom.com", password: "tomtom", password_confirmation: "tomtom")

user.save


100.times do
  Ingredient.create(name: Faker::Hipster.word, abv: Faker::Commerce.price)
end

methods = ["stirred", "shaken", "built", "carbonated"]
100.times do
  Recipe.create(name: Faker::Superhero.name, dilute: Faker::Boolean.boolean, method: methods.sample, user_id: 1)
end
units = ["ml", "dash", "drop", "oz"]
500.times do
  IngredientsRecipe.create(ingredient_id: rand(1..100), recipe_id: rand(1..100), volume: rand(1..50).to_s, unit: units.sample)
end