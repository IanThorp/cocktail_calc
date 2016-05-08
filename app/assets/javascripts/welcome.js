// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


$i=0;
var recipe =[];
var batches = 1;
var totalVolume = 0;
var water = 0;
var finalABV = 0;
var finalVolume = 0;
var totalAlcohol = 0;

$(document).ready(function(){

    for (var startingrows=1; startingrows<4; startingrows++){
        addrow();

    }
    $("button#addRow").click(function(){
        addrow();

    });
    $("button#print").click(function(){


       var divToPrint=document.getElementById("batchedRecipeDiv");
       newWin= window.open("");
       newWin.document.write(divToPrint.outerHTML);
       newWin.print();
       newWin.close();
    });

    function addrow(){
         $i++;
        var newrow = $('<tr id="' +$i + '">\
                    <td>\
                        <input type="text" class="volume form-control" id="volume' +$i +'">\
                    </td>\
                    <td>\
                        <select class="form-control" id="unit' +$i +'">\
                           <option value="oz">fl. oz</option>\
                           <option value="ml">mL</option>\
                           <option value="dash">dash</option>\
                           <option value="drop">drop</option>\
                        </select> \
                    </td>\
                    <td><input type="text" class="volume form-control" id="abv' +$i +'">\
                    <td>\
                        <input type="text" class="name form-control" id="name' +$i +'">\
                    </td>\
                    <td><p id="ml' +$i + '">0</p></td>\
                </tr>');


        $('#recipeTable > tbody:last-child').append(newrow);

    };
    $("button#calculate").click(function(){
        calculate()

    });

    function calculate(){

        recipe =[];


        var totalVolume = 0;

        var totalAlcohol = 0;

        var alcohol = 0;

        var water = 0;

        for (var tableread=1; tableread<=$i; tableread++){



            //read volume

            var volumeid = 'volume' + tableread;
            var volume = Number($("#" + volumeid).val());

            if (volume > 0){

            //read unit of measure, convert to ml

            var unitid = 'unit' + tableread;
            var unit = $("#" + unitid).val();

            if (unit == "oz"){
                volume = volume*29.375;
            }
            if (unit == "dash"){
                volume = volume*0.8;
            }
            if (unit == "drop"){
                volume = volume*0.05;
            }


            //read abv, convert to decimal

            var abvid = 'abv' + tableread;
            var abv = Number($("#" + abvid).val());

            //read ingredient name
            var nameid = 'name' + tableread

            var name = $("#" + nameid).val();



            //convert abv to decimal for calculations
            abv /= 100;

            alcohol = abv*volume;

            totalVolume += volume;

            totalAlcohol += alcohol;


            //write ML

            var mlrow = 'ml' + tableread;

            Math.round(volume*10000)/10000;
            $("#" + mlrow).text(volume);

            //creates an object for each ingredient in the table
            var ingredient= {name:name, volume:volume, abv:abv};

            //places object with name and volume in array recipeTable


            recipe.push(ingredient);
            console.log(recipe);
            }

        }

        totalABV =totalAlcohol/totalVolume;

        //write initial abv to stats table

        $("#initialabv").text(Math.round(totalABV*10000)/100 + "%");
        $("#initialvolume").text(totalVolume + "ml / " + Math.round(totalVolume/29.375*100)/100 +"oz.");

        if ($("#autoDilute").is(":checked"))
        {
            var totalDilution = 0;
            //get drink making method

            var method = $("input:checked").val();

            if (method == 'stirred') {

                totalDilution = (-1.21*Math.pow(totalABV,2)+ 1.246*totalABV+ 0.145);

            }

            if (method == 'shaken'){

                totalDilution = (-1.567*Math.pow(totalABV,2)+ 1.742*totalABV + 0.203);
            }
            if (method == 'built') {
                totalDilution = 0;
            }
            water = totalDilution*totalVolume;


        }

        finalVolume = (totalVolume+water);
        finalABV = totalAlcohol/(totalVolume+water);

        water = Math.round(water*100)/100;
        finalABV = Math.round(finalABV*10000)/10000;
        finalVolume = Math.round(finalVolume*100)/100;

        //create an ingredient array for water

        ingredient = {name:"water", volume:water, abv:"0"};
        //places object with name "water" and volume of dilution needed in array recipeTable
        recipe.push(ingredient);

        $('#dilutionvolume').text(water + "ml / " + Math.round(water/29.375*100)/100 + "oz.");

        $("#finalabv").text(Math.round(10000*finalABV)/100 + "%");
        $("#finalvolume").text(finalVolume + "ml / " + Math.round(finalVolume/29.375*100)/100 +"oz.");


    }
    $("button#batchByNumber").click(function(){


        batches = $("#batchNumber").val();

        calculate();
        printrecipe();

    });
    $("button#batchByVolume").click(function(){



        var batchAmount = $("#batchVolume").val();
        var batchUnit = $("#batchUnit").val();

        if (batchUnit == "oz"){
            batchAmount *= 29.375;
        }

        batches = batchAmount/finalVolume;

        calculate ();

        printrecipe();

    });

    function printrecipe(){

        var table = document.getElementById("batchedRecipe");
        var rowCount = table.rows.length;

        if (rowCount > 1){
            for (var k = 1; k < rowCount; k++){
                var deletion = table.rows.length;
                table.deleteRow(deletion-1);
            }
        }


        var arrayLength = recipe.length;
        console.log (arrayLength);

        console.log(recipe);


        for (var j = 0; j < arrayLength; j++) {

            ingredient = recipe[j];



        var name = ingredient.name;

        var volume = ingredient.volume * Number(batches);
        var recipeRow = $('<tr><td>' + Math.round(volume*100)/100 + 'mL</td><td>' + Math.round(volume/29.375*100)/100 + '</td><td>' + name + '</tr>');



        $('#batchedRecipe > tbody:last-child').append(recipeRow);
        }
        $("#batchAmountSpan").text(batches);
        $("#batchMlSpan").text(finalVolume*batches);
        $("#batchOzSpan").text(Math.round(batches*finalVolume*100/29.375)/100);
    }


});
