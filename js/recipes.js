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



// 1. 删除 Meal Planner 关联

const {error:planError}=

await supabaseClient
.from("meal_plans")
.delete()
.eq("recipe_id", id);



if(planError){

console.log(
"Delete meal plan error:",
planError
);

}
else{

console.log(
"Meal plan deleted successfully"
);

}



// 2. 删除 Recipe

const {error}=

await supabaseClient
.from("recipes")
.delete()
.eq("id", id);



if(error){

console.log(
"Delete recipe error:",
error
);

alert("Delete failed");

return;

}



alert(
"Recipe deleted"
);



location.reload();


}
