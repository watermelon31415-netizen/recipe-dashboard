const params = new URLSearchParams(
window.location.search
);


const id = params.get("id");



async function loadRecipeDetail(){


const {data,error}=await supabaseClient
.from("recipes")
.select("*")
.eq("id",id)
.single();



if(error){

console.log(error);

document.getElementById("recipeName").innerHTML =
"Recipe Not Found";

return;

}



const recipe = {


...data,


image:
data.image_url


};



console.log(recipe);



// 基本信息

document.getElementById("recipeName").innerHTML =
recipe.name;



document.getElementById("recipeImage").src =
recipe.image;



document.getElementById("recipeMeal").innerHTML =
"🍽 " + recipe.meal;



document.getElementById("recipeTags").innerHTML =
"🏷 " + (recipe.tags || []).join(" 🏷 ");




// Link

document.getElementById("recipeSource").innerHTML =

`

${recipe.link ?

`
🔗 
<a href="${recipe.link}" target="_blank">
Recipe Link
</a>
`

:

""

}

`;




// Note

document.getElementById("recipeNote").innerHTML =
recipe.note || "";





// Ingredients

let ingredientHTML = "";



for(
let category in recipe.ingredients
){


ingredientHTML += `

<h3>
${category}
</h3>

`;



let items =
recipe.ingredients[category];



if(Array.isArray(items)){


items.forEach(item=>{


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


}



document.getElementById("ingredients").innerHTML =
ingredientHTML;




const checks =
document.querySelectorAll(
".ingredient-check"
);





function updateProgress(){


let total =
checks.length;


let done = 0;


let missingItems=[];



checks.forEach(check=>{


if(check.checked){

done++;

}
else{

missingItems.push(
check.parentElement.innerText
);

}


});



let percent=0;



if(total>0){

percent =
Math.round(
done/total*100
);

}




document.getElementById(
"progressFill"
).style.width =
percent+"%";



document.getElementById(
"progressText"
).innerHTML =

`${done} / ${total} (${percent}%)`;




document.getElementById(
"missing"
).innerHTML =


missingItems.length

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




function saveIngredientStatus(){


let status=[];



checks.forEach(check=>{


status.push(
check.checked
);


});



localStorage.setItem(
"ingredientStatus_"+recipe.id,
JSON.stringify(status)
);


}




function loadIngredientStatus(){


let saved =
localStorage.getItem(
"ingredientStatus_"+recipe.id
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




checks.forEach(check=>{


check.addEventListener(
"change",
()=>{


saveIngredientStatus();

updateProgress();


});


});



loadIngredientStatus();

updateProgress();


}



loadRecipeDetail();
