async function initDashboard(){


await loadRecipes();



// ======================
// Load Meal Plan from Supabase
// ======================


const {data:mealPlan,error}=

await supabaseClient
.from("meal_plans")
.select("*");

console.log(
"Dashboard meal plans:",
mealPlan
);

if(error){

console.log(
"Load meal plan error:",
error
);

return;

}



console.log(
"Meal Plan:",
mealPlan
);




// ======================
// Meal Progress
// ======================


let totalMeals = 0;

let completedMeals = 0;



mealPlan.forEach(item=>{


totalMeals++;


if(item.recipe_id){

completedMeals++;

}


});



document.getElementById(
"mealProgress"
).innerHTML =

`${completedMeals} / ${totalMeals}`;


// ======================
// Shopping Progress
// ======================


let shoppingItems = [];



// 根据当前 Meal Plan 找食材

mealPlan.forEach(item=>{


let recipe = recipes.find(

r=>r.id == item.recipe_id

);



if(recipe && recipe.ingredients){


for(let category in recipe.ingredients){


let items =

recipe.ingredients[category].items

?

recipe.ingredients[category].items

:

recipe.ingredients[category];



items.forEach(ingredient=>{


if(!shoppingItems.includes(ingredient)){


shoppingItems.push(ingredient);


}


});


}



}



});



let shoppingStatus =

JSON.parse(

localStorage.getItem("shoppingStatus")

)

|| {};



let shoppingDone = 0;



shoppingItems.forEach(item=>{


if(shoppingStatus[item]){

shoppingDone++;

}


});



document.getElementById(
"shoppingProgress"
).innerHTML =


`${shoppingDone} / ${shoppingItems.length}`;


// ======================
// Today's Meal
// ======================


const today =

new Date()

.toLocaleDateString(
"en-US",
{
weekday:"long"
}
);



let todayHTML = "";



mealPlan.forEach(item=>{


if(item.day === today){



let recipe =

recipes.find(

r=>r.id == item.recipe_id

);



if(recipe){


todayHTML += `


<p>

${item.meal}:

<a href="recipe-detail.html?id=${recipe.id}">

${recipe.name}

</a>

</p>


`;

}


}



});



document.getElementById(
"todayMeal"
).innerHTML =

todayHTML ||

"No meal planned";

// ======================
// Weekly Meal Plan
// ======================


let weeklyHTML = "";



const weekDays = [

"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"

];



weekDays.forEach(day=>{


let dayMeals = mealPlan.filter(

item => item.day === day

);
  

const mealOrder = [
    "Breakfast",
    "Lunch",
    "Dinner"
];


dayMeals.sort((a,b)=>
    mealOrder.indexOf(a.meal)
    -
    mealOrder.indexOf(b.meal)
);
  

weeklyHTML += `

<h3>
${day}
</h3>

`;



if(dayMeals.length === 0){


weeklyHTML += `

<p>
No meal planned
</p>

`;



}
else{


dayMeals.forEach(item=>{


let recipe = recipes.find(

r=>r.id == item.recipe_id

);



if(recipe){


weeklyHTML += `


<p>

${item.meal}:

<a href="recipe-detail.html?id=${recipe.id}">

${recipe.name}

</a>

</p>


`;


}


});


}



});



document.getElementById(
"weeklyMealPlan"
).innerHTML = weeklyHTML;


// ======================
// Random Recipe Button
// ======================


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
).innerHTML =


`

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


}

);




// ======================
// Random Filter
// ======================


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


let pass=true;



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
