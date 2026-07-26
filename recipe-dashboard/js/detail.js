const params = new URLSearchParams(
window.location.search
);


const id = params.get("id");


const recipe = recipes.find(
item => item.id == id
);

console.log(recipe);

if(recipe){

    document.getElementById("recipeName").innerHTML =
    recipe.name;


    document.getElementById("recipeImage").src =
    recipe.image;


    document.getElementById("recipeMeal").innerHTML =
    "🍽 " + recipe.meal;


    document.getElementById("recipeTags").innerHTML =
    "🏷 " + recipe.tags.join(" 🏷 ");

}
else{

    document.getElementById("recipeName").innerHTML =
    "Recipe Not Found";

}

document.getElementById("recipeSource").innerHTML =

`
YouTube:
<a href="${recipe.source.youtube}">
${recipe.source.youtube}
</a>

<br>

小红书:
<a href="${recipe.source.xiaohongshu}">
${recipe.source.xiaohongshu}
</a>
`;



document.getElementById("recipeNote").innerHTML =
recipe.note;

let ingredientHTML = "";


for(
let category in recipe.ingredients
){


ingredientHTML += `

<h3>
${category}
</h3>

`;


recipe.ingredients[category].items.forEach(
item=>{


ingredientHTML += `

<label>

<input 
type="checkbox"
class="ingredient-check"
>
${item}

</label>

<br>


`;

});


}



document.getElementById("ingredients").innerHTML =
ingredientHTML;

const checks = document.querySelectorAll(
".ingredient-check"
);


function updateProgress(){


let total = checks.length;


let done = 0;


let missingItems = [];


checks.forEach(
(check)=>{


if(check.checked){

done++;

}
else{

missingItems.push(
check.parentElement.innerText
);

}


});


let percent = 0;


if(total > 0){

percent =
Math.round(
done / total * 100
);

}



document.getElementById(
"progressFill"
).style.width =
percent + "%";



document.getElementById(
"progressText"
).innerHTML =

`${done} / ${total} (${percent}%)`;



document.getElementById(
"missing"
).innerHTML =


missingItems.length > 0

?

`
❌ 缺少：

<br>

${missingItems.join("<br>")}
`

:

`
✅ 可以做
`;

}



checks.forEach(
check=>{

check.addEventListener(
"change",
()=>{

saveIngredientStatus();

updateProgress();

}
);

}
);




function saveIngredientStatus(){


let status=[];


checks.forEach(
(check,index)=>{


status.push(
check.checked
);


});


localStorage.setItem(
"ingredientStatus_" + recipe.id,
JSON.stringify(status)
);


}

function loadIngredientStatus(){


let saved =
localStorage.getItem(
"ingredientStatus_" + recipe.id
);



if(saved){


let status =
JSON.parse(saved);



checks.forEach(
(check,index)=>{


check.checked =
status[index];


});


}


}



loadIngredientStatus();

updateProgress();