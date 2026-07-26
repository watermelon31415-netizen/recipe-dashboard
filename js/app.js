const recipeList = document.getElementById("recipeList");


async function showRecipes(){

    await loadRecipes();


    recipeList.innerHTML = "";


    recipes.forEach(recipe => {


        recipeList.innerHTML += `

        <div class="recipe-card">

            <img src="${recipe.image}">

            <h2>

                <a href="recipe-detail.html?id=${recipe.id}">
                    ${recipe.name}
                </a>

            </h2>

            <p>
                🍽 ${recipe.meal}
            </p>

            <p>
                🏷 ${(recipe.tags || []).join(" ")}
            </p>

        </div>

        `;

    });

}


showRecipes();