$(document).on('ready page:load', function(){
  saveRecipeListener();

});


var saveRecipeListener = function() {
  $(".save_recipe").on("ajax:beforeSend", function(event, xhr, settings){
    var recipe = {
      ingrArr: [],
      method: $("input[name=method]:checked", "#recipeForm").val(),
      numIngr: $(".ingredientRow").length,
      dilute: $("input[name='dilution']:checked").length == 1,
    }

    for(var i = 1; i <= recipe.numIngr; i++){
      recipe.ingrArr.push(getIngredientValues(i));
    }

    json_recipe = JSON.stringify(recipe)
    settings.data += json_recipe;
  });

  $(".save_recipe").on("ajax:success", function(event, response){
    console.log("Succesfully Saved Recipe");
  })

  $(".save_recipe").on("ajax:error", function(event, xhr, status, error){
    console.log(error);
  })
}

var getIngredientValues = function(id){
  var ingredientTemp = {
    volume: $("#volume" + id).val(),
    abv: $("#abv" + id).val(),
    unit: $("#unit" + id).val(),
    name: $("#name" + id).val()
  };
  return ingredientTemp;
}
