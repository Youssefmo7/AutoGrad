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

if (role === "student") {
document.getElementById("studentBtn").classList.add("active");
} else {
document.getElementById("doctorBtn").classList.add("active");
}
}

function handleFormSubmit(e) {
e.preventDefault();

if (!selectedRole) {
alert("من فضلك اختر طالب أو دكتور");
return false;
}

// هنا بقى تقدر تتعامل مع الفورم زي ما تحب
if (selectedRole === "student") {
window.location.href = "/studentprofile.html";
} else if (selectedRole === "doctor") {
window.location.href = "/DoctorProfile.html";
}

return false;
}

