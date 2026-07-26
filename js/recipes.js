let recipes = [];



async function loadRecipes(){


const {data,error}=await supabaseClient
.from("recipes")
.select("*")
.order("created_at",{ascending:false});



if(error){

console.log(
"Load recipes error:",
error
);

return;

}



recipes = (data || []).map(recipe=>{


return {


...recipe,


// 兼容旧代码
image:
recipe.image_url,


// 兼容 source
source:{
youtube:"",
xiaohongshu:"",
link:recipe.link || ""
}



};


});



console.log(
"Recipes loaded:",
recipes
);


}

async function deleteRecipe(id){


if(!confirm("Delete this recipe?")){

return;

}


await supabaseClient
.from("meal_plans")
.delete()
.eq("recipe_id",id);



const {error}=await supabaseClient
.from("recipes")
.delete()
.eq("id",id);


if(error){

console.log(error);

alert("Delete failed");

return;

}


alert("Recipe deleted");


location.reload();


}
