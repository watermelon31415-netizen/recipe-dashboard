async function controlMenu(){


const {
data:{
session
}
}=await supabaseClient.auth.getSession();



const addBtn =
document.getElementById(
"addRecipeBtn"
);


const authBtn =
document.getElementById(
"authBtn"
);



if(addBtn){

if(!session){

addBtn.style.display="none";

}

}



// 登录状态

if(authBtn){


if(session){


authBtn.innerHTML =
"🚪 Logout";


authBtn.href="#";


authBtn.onclick = async function(){


await supabaseClient.auth.signOut();


location.href="login.html";


};


}


}



}


controlMenu();
