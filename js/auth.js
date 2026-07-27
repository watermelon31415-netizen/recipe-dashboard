document
.getElementById("loginBtn")
.addEventListener(
"click",
async ()=>{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



const {data,error}=

await supabaseClient.auth.signInWithPassword({

email,

password

});



if(error){

console.log(error);

document.getElementById(
"message"
).innerHTML =
"Login Failed";


return;

}



document.getElementById(
"message"
).innerHTML =
"Login Success";



location.href =
"index.html";


});
