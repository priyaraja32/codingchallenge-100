//  Local Storage Users
let users = JSON.parse(localStorage.getItem("users") || "[]");

//  PASSWORD TOGGLE
function togglePassword(id, el){
    const input = document.getElementById(id);
    if(input.type==="password"){ input.type="text"; el.textContent=""; }
    else{ input.type="password"; el.textContent=""; }
}

//  REGISTRATION VALIDATION 
function checkRegName(){ let name=document.getElementById("regName").value; document.getElementById("regNameError").textContent = name.length>=3?"":"Name 3+ chars"; }
function checkRegEmail(){ let email=document.getElementById("regEmail").value; document.getElementById("regEmailError").textContent=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)?"":"Invalid email"; }
function checkRegPass(){ let pass=document.getElementById("regPass").value; document.getElementById("regPassError").textContent=pass.length>=6?"":"Password 6+ chars"; }

function register(){
    let name=document.getElementById("regName").value,
        email=document.getElementById("regEmail").value,
        pass=document.getElementById("regPass").value;

    if(name.length<3||pass.length<6||!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/).test(email)){ alert("Fill valid details"); return; }
    if(users.find(u=>u.email===email)){ alert("User exists!"); return; }

    users.push({name,email,pass});
    localStorage.setItem("users",JSON.stringify(users));
    alert("Registered! Login now.");
    showLogin();
}

// LOGIN
function checkLoginEmail(){ let email=document.getElementById("loginEmail").value; document.getElementById("loginEmailError").textContent=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)?"":"Invalid email"; }
function checkLoginPass(){ let pass=document.getElementById("loginPass").value; document.getElementById("loginPassError").textContent=pass.length>=6?"":"Password 6+ chars"; }

function login(){
    let email=document.getElementById("loginEmail").value,
        pass=document.getElementById("loginPass").value;

    let user = users.find(u=>u.email===email && u.pass===pass);
    if(user){
        document.getElementById("registerCard").style.display="none";
        document.getElementById("loginCard").style.display="none";
        document.getElementById("menuSection").style.display="block";
        document.getElementById("userName").textContent=user.name;
        localStorage.setItem("loggedIn",JSON.stringify(user));
    } else { alert("Invalid email or password"); }
}

function showLogin(){ document.getElementById("registerCard").style.display="none"; document.getElementById("loginCard").style.display="block"; }
function showRegister(){ document.getElementById("loginCard").style.display="none"; document.getElementById("registerCard").style.display="block"; }

// LIKE BUTTON
function likeFood(el,id){
    if(!localStorage.getItem("loggedIn")){ alert("Login first!"); return; }
    el.classList.add("liked");
    setTimeout(()=>el.classList.remove("liked"),200);
    let span=document.getElementById(id);
    span.textContent = parseInt(span.textContent)+1;
}

// ORDER BUTTON
function orderFood(item){
    if(!localStorage.getItem("loggedIn")){ alert("Login first!"); return; }

    // Notification
    let notification=document.createElement("div");
    notification.textContent=`Order confirmed for ${item}!`;
    notification.style.position="fixed";
    notification.style.bottom="20px";
    notification.style.right="20px";
    notification.style.background="#28a745";
    notification.style.color="white";
    notification.style.padding="15px 20px";
    notification.style.borderRadius="8px";
    notification.style.boxShadow="0 4px 10px rgba(0,0,0,0.3)";
    notification.style.zIndex=1000;
    document.body.appendChild(notification);

    setTimeout(()=>notification.remove(),3000);
}

//  LOGOUT
function logout(){
    localStorage.removeItem("loggedIn");
    document.getElementById("menuSection").style.display="none";
    document.getElementById("loginCard").style.display="block";
}




