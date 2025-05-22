const container = document.querySelector('.container');
const registerbtn = document.querySelector('.register-btn');
const loginbtn = document.querySelector('.login-btn');

registerbtn.addEventListener('click', ()=>{
    container.classList.add('active');
});

loginbtn.addEventListener('click', ()=>{
    container.classList.remove('active');
});



let selectedRole = "null";

function selectRole(role) {
selectedRole = role;
document.getElementById("studentBtn").classList.remove("active");
document.getElementById("doctorBtn").classList.remove("active");
document.querySelector('#roleInput').value = role;

if (role === "Student") {
document.getElementById("studentBtn").classList.add("active");
} else {
document.getElementById("doctorBtn").classList.add("active");
}
}