const shoppingList =
document.getElementById("shoppingList");



async function initShopping(){


    await loadRecipes();



    // ======================
    // 从 Supabase 获取 Meal Plan
    // ======================


    const {data:mealPlan,error}=

await supabaseClient
.from("meal_plans")
.select("*");


console.log(
"Shopping meal plans:",
mealPlan
);

console.log(
"Shopping error:",
error
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



    let selectedRecipes = [];



    // 找出本周安排的菜


    mealPlan.forEach(item=>{


        let recipe =

        recipes.find(

            recipe =>

            recipe.id == item.recipe_id

        );



        if(recipe){

            selectedRecipes.push(recipe);

        }


    });



    console.log(
        "Selected Recipes:",
        selectedRecipes
    );



    // ======================
    // 合并食材
    // ======================


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


                if(
                    !ingredients[category]
                    .includes(item)
                ){


                    ingredients[category]
                    .push(item);


                }


            });



        }



    });



    console.log(
        "Ingredients:",
        ingredients
    );



    // ======================
    // 显示购物清单
    // ======================


    let html = "";



    for(let category in ingredients){



        html += `


        <h3>
        ${category}
        </h3>


        `;



        ingredients[category]
        .forEach(item=>{


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



    shoppingList.innerHTML = html;



    const shoppingChecks =

    document.querySelectorAll(
        ".shopping-check"
    );



    // ======================
    // 保存购买状态
    // ======================



    function saveShoppingStatus(){


        let status = {};



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

            localStorage.getItem(
                "shoppingStatus"
            )

        )

        || {};



        shoppingChecks.forEach(check=>{


            if(
                saved[check.dataset.item]
            ){


                check.checked = true;


            }


        });



    }





    function updateShoppingProgress(){


        let total =

        shoppingChecks.length;



        let done = 0;



        shoppingChecks.forEach(check=>{


            if(check.checked){

                done++;

            }


        });



        document.getElementById(
            "shoppingProgress"
        ).innerHTML =


        `${done} / ${total}`;



    }





    shoppingChecks.forEach(check=>{


        check.addEventListener(

            "change",

            ()=>{


                saveShoppingStatus();


                updateShoppingProgress();


            }

        );


    });




    loadShoppingStatus();


    updateShoppingProgress();



}



initShopping();
