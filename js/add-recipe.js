const recipeId =
new URLSearchParams(
window.location.search
).get("id");


// ======================
// Edit Mode Load Recipe
// ======================

if(recipeId){

    loadRecipe();

}



async function loadRecipe(){


const {data,error}=

await supabaseClient
.from("recipes")
.select("*")
.eq("id", recipeId)
.single();



if(error){

console.log(
"Load recipe error:",
error
);

return;

}



document.getElementById("recipeName").value =
data.name || "";


document.getElementById("meal").value =
data.meal || "";


document.getElementById("tags").value =

Array.isArray(data.tags)

?
data.tags.join(", ")

:

data.tags || "";


console.log(
"Loaded tags:",
data.tags
);


document.getElementById("time").value =
data.time || "";


document.getElementById("note").value =
data.note || "";



document.getElementById("meat").value =

(data.ingredients?.["🥩 Meat"] || [])
.join(", ");



document.getElementById("vegetables").value =

(data.ingredients?.["🥦 Vegetables"] || [])
.join(", ");



document.getElementById("main").value =

(data.ingredients?.["🍚 Main"] || [])
.join(", ");



document.getElementById("seasoning").value =

(data.ingredients?.["🧂 Seasoning"] || [])
.join(", ");



document.getElementById("saveRecipe").innerText =
"Update Recipe";


}



// ======================
// Save / Update Recipe
// ======================


document
.getElementById("saveRecipe")
.addEventListener(
"click",
async ()=>{


let imageUrl = "";



// 上传图片

const file =

document
.getElementById("image")
.files[0];



if(file){


const fileName =

Date.now()
+
"-"
+
file.name;



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

alert(
"Image upload failed"
);

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




let newRecipe = {


name:

document
.getElementById("recipeName")
.value,



meal:

document
.getElementById("meal")
.value,



image_url:

imageUrl,



tags:

document
.getElementById("tags")
.value
.split(",")
.map(tag=>tag.trim())
.filter(tag=>tag),



time:

Number(
document
.getElementById("time")
.value
),



note:

document
.getElementById("note")
.value,



link:"",



ingredients:{


"🥩 Meat":

document
.getElementById("meat")
.value
.split(",")
.map(i=>i.trim())
.filter(i=>i),



"🥦 Vegetables":

document
.getElementById("vegetables")
.value
.split(",")
.map(i=>i.trim())
.filter(i=>i),



"🍚 Main":

document
.getElementById("main")
.value
.split(",")
.map(i=>i.trim())
.filter(i=>i),



"🧂 Seasoning":

document
.getElementById("seasoning")
.value
.split(",")
.map(i=>i.trim())
.filter(i=>i)


}


};



console.log(
newRecipe
);



let error;



// Edit

if(recipeId){


const result =

await supabaseClient
.from("recipes")
.update(newRecipe)
.eq(
"id",
recipeId
);


error =
result.error;


}



// Add

else{


const result =

await supabaseClient
.from("recipes")
.insert([
newRecipe
]);


error =
result.error;


}



if(error){

console.log(
error
);

alert(
"Save failed"
);

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


});
