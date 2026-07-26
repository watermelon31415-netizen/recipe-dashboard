async function showRecipes(){


await loadRecipes();



const recipeList =
document.getElementById("recipeList");



if(!recipeList){

return;

}



recipeList.innerHTML = "";



recipes.forEach(recipe => {


recipeList.innerHTML += `

<div class="recipe-card">

<img src="${recipe.image}">


<h2>

<a href="recipe-detail.html?id=${recipe.id}">
${recipe.name}
</a>

</h2>


<p>
🍽 ${recipe.meal}
</p>

<p>
⏱ ${recipe.time || "-"} min
</p>

<p>
🏷 ${(recipe.tags || []).join(" ")}
</p>

<button
onclick="location.href='add-recipe.html?id=${recipe.id}'">
✏️ Edit
</button>

<button
onclick="deleteRecipe(${recipe.id})">
🗑 Delete
</button>

</div>

`;

});


}



showRecipes();
