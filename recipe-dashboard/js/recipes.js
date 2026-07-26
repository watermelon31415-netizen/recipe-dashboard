let recipes = [];



async function loadRecipes(){


const {data,error}=await supabaseClient
.from("recipes")
.select("*")
.order("created_at",{ascending:false});



if(error){

console.log("Load recipes error:", error);

return;

}



recipes = data || [];



console.log(
"Recipes loaded:",
recipes
);


}