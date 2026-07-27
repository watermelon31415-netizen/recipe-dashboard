async function checkAuth(){

const {
data:{
session
}
}=await supabaseClient.auth.getSession();


return session;

}
