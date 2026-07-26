const recipeId =
new URLSearchParams(
window.location.search
).get("id");


if(recipeId){

loadRecipe();

}


const recipeId =
new URLSearchParams(
window.location.search
).get("id");


if(recipeId){

loadRecipe();

}


// 加这里
async function loadRecipe(){


const {data,error}=

await supabaseClient
.from("recipes")
.select("*")
.eq("id", recipeId)
.single();



if(error){

console.log(error);

return;

}



document.getElementById("recipeName").value =
data.name || "";


document.getElementById("meal").value =
data.meal || "";


document.getElementById("tags").value =
(data.tags || []).join(", ");


document.getElementById("time").value =
data.time || "";


document.getElementById("note").value =
data.note || "";



document.getElementById("meat").value =
(data.ingredients?.["🥩 Meat"] || []).join(", ");



document.getElementById("vegetables").value =
(data.ingredients?.["🥦 Vegetables"] || []).join(", ");



document.getElementById("main").value =
(data.ingredients?.["🍚 Main"] || []).join(", ");



document.getElementById("seasoning").value =
(data.ingredients?.["🧂 Seasoning"] || []).join(", ");



document.getElementById("saveRecipe").innerText =
"Update Recipe";


}



// 原来的 saveRecipe 从这里开始

document
.getElementById("saveRecipe")
.addEventListener(
"click",
async ()=>{
  

document
.getElementById("saveRecipe")
.addEventListener(
"click",
async ()=>{


// 上传图片

let imageUrl = "";


const file =
document.getElementById("image").files[0];



if(file){


const fileName =
Date.now() + "-" + file.name;



const {error:uploadError}=

await supabaseClient
.storage
.from("recipes")
.upload(
fileName,
file
);



if(uploadError){

console.log(uploadError);

alert("Image upload failed");

return;

}



const {data:urlData}=

supabaseClient
.storage
.from("recipes")
.getPublicUrl(
fileName
);



imageUrl =
urlData.publicUrl;


}



// 创建 recipe

let newRecipe = {


name:
document.getElementById("recipeName").value,


meal:
document.getElementById("meal").value,


image_url:
imageUrl,


tags:
document.getElementById("tags")
.value
.split(",")
.map(tag=>tag.trim())
.filter(tag=>tag),



time:
Number(
document.getElementById("time").value
),



note:
document.getElementById("note").value,


link:"",



ingredients:{


"🥩 Meat":
document.getElementById("meat")
.value
.split(",")
.map(i=>i.trim())
.filter(i=>i),



"🥦 Vegetables":
document.getElementById("vegetables")
.value
.split(",")
.map(i=>i.trim())
.filter(i=>i),



"🍚 Main":
document.getElementById("main")
.value
.split(",")
.map(i=>i.trim())
.filter(i=>i),



"🧂 Seasoning":
document.getElementById("seasoning")
.value
.split(",")
.map(i=>i.trim())
.filter(i=>i)


}


};



console.log(newRecipe);



let error;


if(recipeId){

const result =

await supabaseClient
.from("recipes")
.update(newRecipe)
.eq("id", recipeId);


error = result.error;

}
else{

const result =

await supabaseClient
.from("recipes")
.insert([newRecipe]);


error = result.error;

}


if(error){

console.log(error);

alert("Save failed");

return;

}


alert(
recipeId
?
"Recipe Updated!"
:
"Recipe Saved!"
);


location.href =
"recipes.html";
