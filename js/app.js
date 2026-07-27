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

<div 
class="recipe-card"
data-meal="${recipe.meal}"
>

${
recipe.image_url
?
`<img src="${recipe.image_url}">`
:
`
<div class="no-image">
🍽️
</div>
`
}


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


const mealFilter =
document.getElementById("mealFilter");



function filterRecipes(){


const keyword =
search
?
search.value.toLowerCase().trim()
:
"";


const selectedMeal =
mealFilter
?
mealFilter.value
:
"";



const cards =
document.querySelectorAll(
".recipe-card"
);



cards.forEach(card=>{


const text =
card.innerText.toLowerCase();



const meal =
card.dataset.meal;



const matchKeyword =
text.includes(keyword);



const matchMeal =
selectedMeal === "" ||
meal === selectedMeal;



if(
matchKeyword &&
matchMeal
){

card.style.display =
"block";

}
else{

card.style.display =
"none";

}


});


}



if(search){

search.addEventListener(
"input",
filterRecipes
);

}



if(mealFilter){

mealFilter.addEventListener(
"change",
filterRecipes
);

}

}
