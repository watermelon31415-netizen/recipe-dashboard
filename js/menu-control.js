async function controlMenu(){


const session =
await checkAuth();



const addBtn =
document.getElementById(
"addRecipeBtn"
);



if(addBtn){

if(!session){

addBtn.style.display="none";

}

}



}


controlMenu();
