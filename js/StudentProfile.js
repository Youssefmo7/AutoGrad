const token = localStorage.getItem('userToken');
if(!token){window.location.href = 'index.html';}
await getUserData();
let teamData = await getTeamData();


console.log(teamData);
const user = JSON.parse(localStorage.getItem('userData'));
const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;
document.querySelector('.personalInfo .name').textContent = userName;
document.querySelector('.personalInfo .number').textContent = user.academicIDNumber;
document.querySelector('.bio').textContent = user.bio;
document.querySelector('.major ul :nth-child(1)').textContent = `Major: ${user.department}`;
document.querySelector('.major ul :nth-child(2)').textContent = `Gpa: ${user.gpa}`;
document.querySelector('.major ul :nth-child(3)').textContent = `Semester: ${Math.trunc(user.creaditHours / 3 / 6)}`;
document.querySelector('.major ul :nth-child(4)').textContent = `Credit Hours: ${user.creaditHours}`;
document.querySelector('.tracks ul :nth-child(1)').textContent = `${user.track}`;
document.querySelector('.contact #Email').textContent = `Email: ${user.email}`;
document.querySelector('.contact #phone').textContent = `Phone: ${user.phoneNumber}`;
document.querySelector('.team h3').textContent = teamData.teamName;
document.querySelector('.team #bio').textContent = teamData.teamBio;
let members = document.querySelectorAll('.team ol li');
for(let i = 0; i < members.length; i++)
{
    members[i].textContent = teamData.students[i].name;
}
document.querySelector('.team .supervisors .doctor p').innerHTML = `
Doctor<br>${teamData.doctor.name}
`
document.querySelector('.team .supervisors .ta p').innerHTML = `
ENG<br>${teamData.ta}
`

async function getUserData() {
    try {
        const api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Student/GetStudentProfile';
        const response = await fetch(`${api}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const user = await response.json();
        localStorage.setItem('userData', JSON.stringify(user));
    } catch(err) {}
}

async function getTeamData(){
    const response = await fetch(`https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/GetTeamData?teamId=${JSON.parse(localStorage.getItem('userData')).teamId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return await response.json();
}

// نوع المستخدم: غيره إلى "student" لو اليوزر طالب
const userRole = localStorage.getItem('userRole'); // أو "student"
const studentGrade = 88; // ممكن تجيبها من قاعدة بيانات

const gradeBox = document.getElementById("gradeBox");
document.getElementById("studentSeminarGrade").addEventListener("click", function () {
    let gradeContent = document.getElementById("gradeContent");

    // عرض الصندوق
    gradeBox.style.display = "block";

    // لو دكتور → input و زر حفظ
    if (userRole === "doctor") {
        gradeContent.innerHTML = `
        <input type="number" id="gradeInput" value="${studentGrade}" min="0" max="100" />
        `;
        let saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.onclick = () => saveGrade();
        gradeContent.appendChild(saveBtn);
    } else {
        // لو طالب → عرض الدرجة فقط
        gradeContent.innerHTML = `<p>${studentGrade}</p>`;
        document.querySelector('.grade-box').style.margin = '15px 0 0 24%'
    }
});

function saveGrade() {
    const input = document.getElementById("gradeInput");
    const newGrade = input.value;
    gradeBox.style.display = 'none';
}
document.querySelector('.Notification-btn').onclick = openModal;
document.querySelector('.Notification-btn').style.cursor = 'pointer';
document.querySelector('.modal-content .close-btn').onclick = closeModal;

async function openModal() {
    let requests;
    const api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/getallrequesttojointeam'
    const response = await fetch(`${api}`, {
        headers: {'Authorization': `Bearer ${localStorage.getItem('userToken')}`}
    }).then(r => r.json()).then(data => requests = data);
    console.log(requests);
    let requestsList = document.querySelector('.Members_stack');
    requests.forEach(request => {
        let req = document.createElement('div');
        req.classList.add('team-card');
        req.innerHTML = `
            <div class="team-logo">
                <img src="pics/omara.jpeg" alt="Team Logo">
            </div>
            <div class="team-name">
                <h3>${request.teamName}</h3>
            </div>
        `
        let teamActions = document.createElement('div');
        teamActions.classList.add('team-actions');
        let approveBtn = document.createElement('button');
        approveBtn.classList.add('approve_btn');
        approveBtn.innerHTML = "<i class='bx bx-check-circle'></i>"
        approveBtn.addEventListener('click', async (e) => {
            const response = await fetch(`https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/AcceptJoinRequest?requestId=${request.requestId}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            })
            console.log(request.requestId)
            const memberRow = e.target.closest(".team-card");
            memberRow.remove();
            updateNotificationCount();
        })
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove_btn');
        removeBtn.addEventListener("click", async (e) => {
            const response = await fetch(`https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/RejectJoinRequest?requestId=${request.requestId}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            })
            const memberRow = e.target.closest(".team-card");
            memberRow.remove();
        });
        removeBtn.innerHTML = "<i class='bx bx-x-circle'></i>";
        teamActions.append(approveBtn);
        teamActions.append(removeBtn);
        req.append(teamActions);
        requestsList.append(req);
    })
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  let requestsList = document.querySelectorAll('.Members_stack div');
  requestsList.forEach(request => {
    request.remove();
  })
  document.getElementById("modal").style.display = "none";
}



// جرس الاشعارات
function updateNotificationCount() {
    const count = document.querySelectorAll("#modal .team-card").length;
    const countSpan = document.getElementById("notificationCount");
    countSpan.textContent = count;

  // لو صفر، نخفي الرقم
    if (count === 0) {
        countSpan.style.display = "none";
    } else {
        countSpan.style.display = "inline";
    }
}

// استدعاء أولي عند تحميل الصفحة
window.onload = updateNotificationCount;

document.querySelector('.nav-container a[data-team="team"]').addEventListener('click', (e) => {
    if(JSON.parse(localStorage.getItem('userData')).teamId) window.location.href = 'EditTeamProfile.html';
    else window.location.href = 'createTeam.html';
})