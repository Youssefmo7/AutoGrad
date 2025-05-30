

const token = localStorage.getItem('userToken');
if(!token) window.location.href = 'index.html';

const user = JSON.parse(localStorage.getItem('userData'));
let fields = document.querySelectorAll('.form input');
fields.forEach(field => {
    field.value = user[field.dataset.name];
});
let bio = document.querySelector('.form textarea');
bio.value = user.bio;

document.querySelector('.form .buttons .cancel').addEventListener('click', e => {
    window.location.href = 'studentprofile.html';
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
    const api = 'https://autograd3-daayg5argwb5czav.uaenorth-01.azurewebsites.net/api/Student';
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