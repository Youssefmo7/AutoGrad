

const token = localStorage.getItem('userToken');
if(!token) window.location.href = 'index.html';

const user = JSON.parse(localStorage.getItem('userData'));
let fields = document.querySelectorAll('.form input');
fields.forEach(field => {
    // console.log(field);
    field.value = user[field.dataset.name];
});
let bio = document.querySelector('.form textarea');
bio.value = user.bio;

if(localStorage.getItem('userRole') == 'Doctor')
{
    document.querySelector('.nav-container .nav-bullet[href="EditTeamProfile.html"]').href = 'docteams.html'
    document.querySelector('.nav-container .nav-bullet:first-child').href = 'DoctorProfile.html';
}

document.querySelector('.form .buttons .cancel').addEventListener('click', e => {
    let role = localStorage.getItem('userRole');
    console.log(role);
    if(role == 'Student')
        window.location.href = 'studentprofile.html';
    else 
        window.location.href = 'DoctorProfile.html';
});

function ProfileUpdated(){
    document.getElementById('profileUpdated').style.display = 'flex';
}

function closeProfileUpdatePopup(){
    document.getElementById('profileUpdated').style.display = 'none';
}

let form = document.querySelector('.form');
document.querySelector('.form .buttons .save').addEventListener('click', async () => {
    let userData = user;
    fields.forEach(field => {
        userData[field.dataset.name] = field.value;
    });
    userData["bio"] = bio.value;
    localStorage.setItem('userData', JSON.stringify(userData));
    let api;
    if(localStorage.getItem('userRole') == 'Student')
        api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Student/StudentEditProfile';
    else
        api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Doctor';
    const resopnse = await fetch(`${api}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  
        },
        body: JSON.stringify(userData)
    });
    ProfileUpdated();
});