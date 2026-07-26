async function initDashboard(){


await loadRecipes();



let mealPlan =
JSON.parse(
localStorage.getItem("mealPlan")
)
|| {};


let totalMeals = 0;


let completedMeals = 0;



for(let day in mealPlan){


for(let meal in mealPlan[day]){


totalMeals++;


if(
mealPlan[day][meal]
){

completedMeals++;

}


}

}



document.getElementById(
"mealProgress"
).innerHTML =

`${completedMeals} / ${totalMeals}`;

let shoppingStatus =
JSON.parse(
localStorage.getItem("shoppingStatus")
)
|| {};



let shoppingDone = 0;


let shoppingTotal =
Object.keys(shoppingStatus).length;



Object.values(shoppingStatus)
.forEach(item=>{


if(item){

shoppingDone++;

}


});



document.getElementById(
"shoppingProgress"
).innerHTML =

`${shoppingDone} / ${shoppingTotal}`;

const today =
new Date()
.toLocaleDateString(
"en-US",
{
weekday:"long"
}
);



let todayHTML =
"";



if(mealPlan[today]){


for(let meal in mealPlan[today]){


let recipe =
recipes.find(
r=>r.id == mealPlan[today][meal]
);



if(recipe){

todayHTML += `

<p>

${meal}:
${recipe.name}

</p>

`;

}

}

}



document.getElementById(
"todayMeal"
).innerHTML =
todayHTML ||
"No meal planned";


document
.getElementById("randomBtn")
.addEventListener(
"click",
()=>{


let randomIndex =
Math.floor(
Math.random()*recipes.length
);



let recipe =
recipes[randomIndex];



document.getElementById(
"randomResult"
).innerHTML = `


<h3>

${recipe.name}

</h3>


<p>

🍽 ${recipe.meal}

</p>


<p>

🏷 ${recipe.tags.join(", ")}

</p>


<a href="recipe-detail.html?id=${recipe.id}">

查看菜谱

</a>


`;


});

function randomRecipe(){


let meal =
document.getElementById(
"randomMeal"
).value;


let time =
Number(
document.getElementById(
"randomTime"
).value
);


let tag =
document.getElementById(
"randomTag"
).value
.trim();



let filtered =
recipes.filter(recipe=>{


let pass = true;



if(meal){

pass =
pass &&
recipe.meal == meal;

}



if(time){

pass =
pass &&
recipe.time <= time;

}



if(tag){

pass =
pass &&
recipe.tags.includes(tag);

}



return pass;


});



if(filtered.length===0){


document.getElementById(
"randomRecipe"
).innerHTML =

"没有符合条件的菜";


return;


}



let random =
filtered[
Math.floor(
Math.random()*filtered.length
)
];



document.getElementById(
"randomRecipe"
).innerHTML =

`

<h3>
${random.name}
</h3>


<img 
src="${random.image}"
width="200"
>


<p>
🍽 ${random.meal}
</p>


<p>
🏷 ${random.tags.join(" 🏷 ")}
</p>


<p>
⏱ ${random.time || "-"} min
</p>


<a href="recipe-detail.html?id=${random.id}">
View Recipe
</a>

`;

}



document
.getElementById("randomButton")
.addEventListener(
"click",
randomRecipe
);


randomRecipe();

}
 

initDashboard();