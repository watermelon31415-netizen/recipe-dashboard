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



const {error}=await supabaseClient
.from("recipes")
.insert([newRecipe]);



if(error){

console.log(error);

alert("Save failed");

return;

}



alert("Recipe Saved!");



});
