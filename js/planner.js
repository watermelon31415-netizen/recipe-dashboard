const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


const meals = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Drink",
    "Snack"
];


const planner =
document.getElementById("planner");


function showRecipeResults(results, input, recipeList){

    results.innerHTML =
    recipeList.map(recipe => `
        <div
            class="recipe-item"
            data-id="${recipe.id}"
        >
            ${recipe.name}
        </div>
    `).join("");

    results.style.display = "block";

    results.querySelectorAll(".recipe-item")
    .forEach(item => {

        item.addEventListener("click", () => {

            const recipeId = item.dataset.id;

            const select =
            input
            .closest(".meal-picker")
            .querySelector(".meal-select");

            select.value = recipeId;

            select.dispatchEvent(
                new Event("change")
            );

            input.value = item.textContent.trim();

            results.innerHTML = "";
            results.style.display = "none";

        });

    });

}


async function initPlanner(){


    // 等 recipes 从 Supabase 加载完成
    await loadRecipes();



    days.forEach(day=>{


        planner.innerHTML += `


        <div class="day-card">


            <h2>
            ${day}
            </h2>



${meals.map(meal=>`

<div class="meal-picker">

    <label>
    ${meal}
    </label>

    <!-- 新增这一块 -->
    <div class="picker-header">

        <input
            type="text"
            class="recipe-search"
            placeholder="🔍 Search recipe..."
        >

        <button
            type="button"
            class="show-all-btn"
        >
            📋 All
        </button>

    </div>

    <!-- 原来的 select 保留 -->
    <select
        class="meal-select"
        data-day="${day}"
        data-meal="${meal}"
    >

        <option value="">
            Choose Recipe
        </option>

        ${recipes.map(recipe=>`

<option value="${recipe.id}">
${recipe.id} - ${recipe.name}
</option>

`).join("")}

    </select>

    <!-- 以后搜索结果会显示在这里 -->
    <div class="recipe-results"></div>

</div>

`).join("")}



        </div>


        `;


    });

const searchInputs =
document.querySelectorAll(
    ".recipe-search"
);

    const allButtons =
document.querySelectorAll(
    ".show-all-btn"
);

    const selects =
    document.querySelectorAll(
        ".meal-select"
    );

searchInputs.forEach(input => {

    input.addEventListener("input", () => {

        const keyword =
        input.value.toLowerCase().trim();

        const results =
        input
        .closest(".meal-picker")
        .querySelector(".recipe-results");

        if(keyword === ""){

    const select =
    input
    .closest(".meal-picker")
    .querySelector(".meal-select");


    select.value = "";


    select.dispatchEvent(
        new Event("change")
    );


    results.style.display = "none";

    results.innerHTML = "";


    return;

}

        const filtered =
        recipes.filter(recipe =>
            recipe.name
            .toLowerCase()
            .includes(keyword)
        );


        showRecipeResults(
    results,
    input,
    filtered
);


    });

});

allButtons.forEach(button => {

    button.addEventListener("click", () => {

        const mealPicker =
        button.closest(".meal-picker");

        const results =
        mealPicker.querySelector(".recipe-results");

        const input =
mealPicker.querySelector(".recipe-search");

showRecipeResults(
    results,
    input,
    recipes
);

    });

});
    
    selects.forEach(select=>{


        select.addEventListener(
    "change",
    async ()=>{


        console.log(
            "Selected:",
            select.dataset.day,
            select.dataset.meal,
            select.value
        );


        await saveMealPlan(

            select.dataset.day,

            select.dataset.meal,

            select.value

        );


    }
);


    });



    // 加载已经保存的计划
    await loadMealPlan();


}





async function saveMealPlan(
    day,
    meal,
    recipe_id
){

    // 如果选择了 "Choose Recipe"，删除这一条 Meal Plan
    if(recipe_id === ""){

        const {error} =
        await supabaseClient
        .from("meal_plans")
        .delete()
        .eq("day", day)
        .eq("meal", meal);

        if(error){
            console.log("Delete meal plan error:", error);
        }

        return;
    }


    const {error}=

    await supabaseClient
    .from("meal_plans")
    .upsert(

        {

            day: day,

            meal: meal,

            recipe_id: Number(recipe_id)

        },

        {

            onConflict:"day,meal"

        }

    );



    if(error){

        console.log(
            "Save meal plan error:",
            error
        );

    }

}








async function loadMealPlan(){


    const {data,error}=

    await supabaseClient
    .from("meal_plans")
    .select("*");



    if(error){

        console.log(
            "Load meal plan error:",
            error
        );

        return;

    }



    const selects =
    document.querySelectorAll(
        ".meal-select"
    );



    selects.forEach(select=>{


        const saved =

        data.find(item=>

            item.day === select.dataset.day

            &&

            item.meal === select.dataset.meal

        );



       if(saved){


let exists = Array.from(select.options)
.some(option =>
option.value == saved.recipe_id
);


if(exists){

    select.value =
    String(saved.recipe_id);

    // 新增：显示菜谱名称到搜索框
    const mealPicker =
    select.closest(".meal-picker");

    const searchInput =
    mealPicker.querySelector(".recipe-search");

    const recipe =
    recipes.find(r =>
        r.id == saved.recipe_id
    );

    if(recipe){
        searchInput.value = recipe.name;
    }

}

else{

    select.value = "";

    const mealPicker =
    select.closest(".meal-picker");

    const searchInput =
    mealPicker.querySelector(".recipe-search");

    searchInput.value = "";

}


}
else{

    select.value = "";

    const mealPicker =
    select.closest(".meal-picker");

    const searchInput =
    mealPicker.querySelector(".recipe-search");

    searchInput.value = "";

}
           


    });



}



// 清空本周 Meal Plan

document
.getElementById("clearPlan")
.addEventListener(
"click",
async ()=>{


if(!confirm(
"Clear this week's meal plan?"
)){

return;

}



const {error}=

await supabaseClient
.from("meal_plans")
.delete()
.neq(
"id",
0
);



if(error){

console.log(
"Clear meal plan error:",
error
);

alert(
"Clear failed"
);

return;

}



alert(
"Meal plan cleared"
);


location.reload();


});



initPlanner();
