$(document).ready(function(){
  saveRecipeListener();

});


var saveRecipeListener = function() {
  $(".save_recipe").on("ajax:before", function(){
    console.log("This is in Before AJAX");
    var recipe = {
      ingrArr: [],
      method: $("input[name=method]:checked", "#recipeForm").val(),
      numIngr: $(".ingredientRow").length,
      dilute: $("input[name='dilution']:checked").length == 1,
    }

    for(var i = 1; i <= recipe.numIngr; i++){
      recipe.ingrArr.push(getIngredientValues(i));
    }
    var ingredients = recipe.ingrArr;
    var url =
    var method = 'POST';
  });
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
