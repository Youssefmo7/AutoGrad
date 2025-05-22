

// const response = await fetch('https://autogradproject.azurewebsites.net/api/Auth/Register', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     firstName: "John1",
//     middleName: "M",
//     lastName: "Doe",
//     academicIDNumber: "12345",
//     phoneNumber: "0123456789",
//     email: "john.doe@exampl.com",
//     password: "YourSecurePassword123_",
//     confirmPassword: "YourSecurePassword123_",
//     role: "Student" // or "Doctor", "Admin", etc. depending on your backend validation
//   })
// });

// console.log('Status:', response.status);
function registration_successful(selectedRole){
  if (selectedRole === "Student") {
    window.location.href = "/studentprofile.html";
  } else if (selectedRole === "Doctor") {
    window.location.href = "/DoctorProfile.html";
  }
}

const form = document.querySelector('.formReg');
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());
  
  // console.log(userData);

  try{
    const response = await fetch('https://autogradproject.azurewebsites.net/api/Auth/Register', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(userData)
    });

    if(response.ok){
      registration_successful(userData.role);
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
  const userData = Object.fromEntries(loginForm.entries());
  
  try{
    const response = await fetch('https://autogradproject.azurewebsites.net/api/Auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body : JSON.stringify(userData)
    });
    
    if(response.ok){
      login_successful();
    } else {
      login_failed();
    }
  } catch(err) {
    console.log('Network error: ', err);
  }
});
