document
.getElementById("saveRecipe")
.addEventListener(
"click",
async ()=>{


let newRecipe = {

name:
document.getElementById("recipeName").value,


meal:
document.getElementById("meal").value,


tags:
document.getElementById("tags")
.value
.split(",")
.map(tag=>tag.trim())
.filter(tag=>tag),


image_url:
document.getElementById("image").value,


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


const { data, error } = await supabaseClient
.from("recipes")
.insert([newRecipe]);


if(error){

console.log(error);

alert("Save failed");

return;

}

alert(
"Recipe Saved!"
);

});
