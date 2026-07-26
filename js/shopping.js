const shoppingList =
document.getElementById("shoppingList");



let mealPlan =
JSON.parse(
localStorage.getItem("mealPlan")
)
|| {};



let selectedRecipes = [];


// 找出本周选择的菜

for(let day in mealPlan){


    for(let meal in mealPlan[day]){


        let recipeId =
        mealPlan[day][meal];


        let recipe =
        recipes.find(
        item => item.id == recipeId
        );


        if(recipe){

            selectedRecipes.push(recipe);

        }

    }

}



console.log(selectedRecipes);

let ingredients = {};



selectedRecipes.forEach(recipe=>{


for(let category in recipe.ingredients){


if(!ingredients[category]){

ingredients[category]=[];

}


let items =
recipe.ingredients[category].items
?
recipe.ingredients[category].items
:
recipe.ingredients[category];


items.forEach(item=>{


if(!ingredients[category].includes(item)){


ingredients[category].push(item);


}


});


}


});



console.log(ingredients);

let html = "";


for(let category in ingredients){


html += `

<h3>
${category}
</h3>


`;


ingredients[category].forEach(item=>{


html += `

<label>

<input 
type="checkbox"
class="shopping-check"
data-item="${item}"
>

${item}

</label>


<br>

`;


});


}



document.getElementById(
"shoppingList"
).innerHTML = html;

const shoppingChecks =
document.querySelectorAll(
".shopping-check"
);



function updateShoppingProgress(){


let total =
shoppingChecks.length;


let done = 0;


shoppingChecks.forEach(
check=>{


if(check.checked){

done++;

}


});


document.getElementById(
"shoppingProgress"
).innerHTML =

`${done} / ${total}`;


}


shoppingChecks.forEach(
check=>{


check.addEventListener(
"change",
()=>{


saveShoppingStatus();

updateShoppingProgress();


});


});


function saveShoppingStatus(){


let status={};


shoppingChecks.forEach(check=>{


status[check.dataset.item] =
check.checked;


});


localStorage.setItem(
"shoppingStatus",
JSON.stringify(status)
);


}

function loadShoppingStatus(){


let saved =
JSON.parse(
localStorage.getItem("shoppingStatus")
)
|| {};



shoppingChecks.forEach(check=>{


if(saved[check.dataset.item]){


check.checked = true;


}


});


}



loadShoppingStatus();

updateShoppingProgress();