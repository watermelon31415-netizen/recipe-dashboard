async function showRecipes(){

const {
data:{
session
}
}=await supabaseClient.auth.getSession();


const isAdmin = !!session;

  
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

<img src="${recipe.image_url}">


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


${
isAdmin
?
`

<button
onclick="location.href='add-recipe.html?id=${recipe.id}'">
✏️ Edit
</button>


<button
onclick="deleteRecipe(${recipe.id})">
🗑 Delete
</button>

`
:
""
}


</div>


`;

});


}


showRecipes();


const search =
document.getElementById("search");


if(search){

search.addEventListener(
"input",
function(){


console.log(
"Searching:",
this.value
);



const keyword =
this.value
.toLowerCase()
.trim();



const cards =
document.querySelectorAll(
".recipe-card"
);



cards.forEach(card=>{


const text =
card.innerText
.toLowerCase();



if(text.includes(keyword)){


card.style.display =
"block";


}
else{


card.style.display =
"none";


}


});


});

}
