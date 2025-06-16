// import {initUserProfile} from './StudentProfile.js'
// import { getUserData } from './StudentProfile.js';

const container = document.querySelector('.container');
const registerbtn = document.querySelector('.register-btn');
const loginbtn = document.querySelector('.login-btn');

registerbtn.addEventListener('click', ()=>{
    container.classList.add('active');
});

loginbtn.addEventListener('click', ()=>{
    container.classList.remove('active');
  });
  
  function closeRegFailedPopup() {
    document.getElementById("reg-failed-popup").style.display = "none";
  }

  function registration_failed() {
    document.getElementById("reg-failed-popup").style.display = "flex";
  }
  
  
  function selectRole(role) {
    document.getElementById("studentBtn").classList.remove("active");
    document.getElementById("doctorBtn").classList.remove("active");
    document.querySelector('#roleInput').value = role;
    
    if (role === "Student") {
      document.getElementById("studentBtn").classList.add("active");
    } else {
      document.getElementById("doctorBtn").classList.add("active");
    }
  }
  
//------------------------------------------------Registration-----------------------------------

const form = document.querySelector('.formReg');
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());
  
  try{
    
    const response = await fetch('https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Auth/Register', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(userData)
    });
    
    if(response.ok){
      container.classList.remove('active');
    } else {
      registration_failed();
    }
  } catch(err) {
    console.log("Network error: ", err);
  }
});


// ------------------------------------  Login  --------------------------------------

const loginForm = document.querySelector('.login form');
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const queryParams = new URLSearchParams(formData).toString();
  console.log(queryParams);
  const apiUrl = `https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Auth/Login`;
  
  try {
    const response = await fetch(`${apiUrl}?${queryParams}`, {method: 'POST'});
    const token = await response.text();
    const user = jwt_decode(token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userToken', token);
    if(user.role === 'Student') window.location.href = 'studentprofile.html';
    else window.location.href = 'DoctorProfile.html';
  } catch (err) {
    registration_failed();
    console.log('Network error: ', err);
  }
});
