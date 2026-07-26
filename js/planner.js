const days = [
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"
];


const meals=[
"Breakfast",
"Lunch",
"Dinner"
];


const planner =
document.getElementById("planner");



days.forEach(day=>{


planner.innerHTML += `


<div class="day-card">


<h2>
${day}
</h2>



${meals.map(meal=>`


<div>


<label>
${meal}
</label>


<select 
class="meal-select"
data-day="${day}"
data-meal="${meal}"
>


<option>
Choose Recipe
</option>


${recipes.map(recipe=>`

<option value="${recipe.id}">

${recipe.name}

</option>

`).join("")}



</select>


</div>


`).join("")}



</div>



`;

});

const selects =
document.querySelectorAll(
".meal-select"
);



selects.forEach(select=>{


select.addEventListener(
"change",
()=>{


let plan =
JSON.parse(
localStorage.getItem("mealPlan")
)
|| {};



let day =
select.dataset.day;


let meal =
select.dataset.meal;



if(!plan[day]){

plan[day]={};

}



plan[day][meal]=
select.value;



await saveMealPlan(
day,
meal,
select.value
);



});


});

// 读取保存的 Meal Plan

async function loadMealPlan(){


const {data,error}=

await supabaseClient
.from("meal_plans")
.select("*");



if(error){

console.log(error);

return;

}



selects.forEach(select=>{


let day =
select.dataset.day;


let meal =
select.dataset.meal;



let saved =
data.find(item=>

item.day==day &&
item.meal==meal

);



if(saved){

select.value =
saved.recipe_id;

}


});


}


loadMealPlan();


selects.forEach(select=>{


let day =
select.dataset.day;


let meal =
select.dataset.meal;



if(
savedPlan[day] &&
savedPlan[day][meal]
){

select.value =
savedPlan[day][meal];

}


});

async function saveMealPlan(
day,
meal,
recipe_id
){


const {error}=

await supabaseClient
.from("meal_plans")
.upsert([

{

day:day,

meal:meal,

recipe_id:Number(recipe_id)

}

],

{

onConflict:
"day,meal"

}

);



if(error){

console.log(
"Save meal plan error:",
error
);

}


}
