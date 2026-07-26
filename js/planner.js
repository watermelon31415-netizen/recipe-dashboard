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
    "Dinner"
];


const planner =
document.getElementById("planner");



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
            async ()=>{


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


            select.value =
            saved.recipe_id;


        }


    });



}






initPlanner();
