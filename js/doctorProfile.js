const token = localStorage.getItem("userToken");
if (!token) window.location.href = "index.html";
await getDoctorData();
let docTeams = await getTeams();
console.log(docTeams);

const user = JSON.parse(localStorage.getItem("userData"));
const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;
document.querySelector(".personalInfo .name").textContent = userName;
document.querySelector(".personalInfo .number").textContent = user.academicIDNumber;
document.querySelector(".info .bio").textContent = user.bio;
document.querySelector(".TeamsNum .num").textContent = user.numsOfTeamss;
document.querySelector(".academicInfo .major ul :nth-child(1)").innerHTML=`<span>Department:</span> ${user.department}`;
document.querySelector(".academicInfo .major ul :nth-child(1)").innerHTML=`<span>Office Number:</span> ${user.office_Number}`;
document.querySelector('.contact #Email').textContent = `Email: ${user.email}`;
document.querySelector('.contact #phone').textContent = `Phone: ${user.phone}`;

docTeams.forEach(team => {
  let div = document.createElement('div');
  div.classList.add('team-card');
  div.innerHTML = `
    <div class="team-logo">
      <img src="pics/logo.png" alt="Team Logo">
    </div>
    <div class="team-name">
      <h3>${team.teamName}</h3>
      <p>${team.teamBio}</p>
    </div>
  `
  registeredTeams.append(div);
})

async function getTeams(){
  const api = `https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/GetTeamsOfDoctor`
  const response = await fetch(`${api}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return await response.json();
}

async function getDoctorData() {
  const api =
    "https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Doctor";
  try {
    const response = await fetch(`${api}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = await response.json();
    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (err) {
    console.log("Network error: ", err);
  }
}

document.querySelector('.Notification-btn').onclick = openModal;
document.querySelector('.Notification-btn').style.cursor = 'pointer';

async function openModal() {
    let requests;
    const api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/Getallrequesttodoctorteam'
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
            const response = await fetch(`https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/DoctorAcceptRequest?requestId=${request.requestId}`, {
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
            const response = await fetch(`https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/DoctorRejectRequest?requestId=${request.requestId}`, {
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

document.querySelector('.close-btn').onclick = closeModal;

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
