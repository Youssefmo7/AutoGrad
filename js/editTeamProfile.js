
const editTeamUrl =
  "https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/EditTeam";
let api = {};
let teamData;
const teamDataApi = `https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/GetTeamData`
const response = await fetch(`${teamDataApi}?teamId=${JSON.parse(localStorage.getItem('userData')).teamId}`,{
  headers: {"Authorization": `Bearer ${localStorage.getItem('userToken')}`}
}).then(res => res.json()).then(data => {teamData = data;}).catch(err => err);

document.querySelector('.identity i').onclick = editTeamName;
document.querySelector('.identity h3').textContent = teamData.teamName;
document.querySelector('#teamBio p').textContent = teamData.teamBio;
document.querySelector('#teamBio i').onclick = editBio;
document.querySelector('#saveBioBtn').onclick = saveBio;
document.querySelector('.supervisors .supervisor p strong').textContent = `DR/ ${teamData.doctor.name}`
// document.querySelector('.supervisors .ta p strong').textContent = `ENG/ ${teamData.ta.name}`
let members = document.querySelector('.Members_stack');
teamData.students.forEach(student => {
  let mem = document.createElement('div');
  mem.classList.add('team-card');
  mem.innerHTML = `
    <div class="team-logo">
        <img src="pics/avatar.png" alt="Team Logo">
    </div>
    <div class="team-name">
        <h3>${student.name}</h3>
        <p> ${student.academicId}</p>
    </div>
    <button class="remove_btn"> <i class='bx bx-x-circle' ></i></button>
  `
  members.appendChild(mem);
})

const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const sendBtn = document.getElementById("sendBtn");
const successMessage = document.getElementById("successMessage");

let selectedFiles = [];

fileInput.addEventListener("change", () => {
  successMessage.style.display = "none";

  selectedFiles = [...selectedFiles, ...Array.from(fileInput.files)];
  renderPreviews();

  fileInput.value = ""; // clear input to allow re-adding same file again if needed
});

function renderPreviews() {
  previewContainer.innerHTML = "";

  selectedFiles.forEach((file, index) => {
    const previewItem = document.createElement("div");
    previewItem.classList.add("preview-item");

    // remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerHTML = "×";
    removeBtn.addEventListener("click", () => {
      selectedFiles.splice(index, 1);
      renderPreviews();
    });

    previewItem.appendChild(removeBtn);

    // image or icon
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      previewItem.appendChild(img);
    } else {
      const icon = document.createElement("i");
      icon.className = "fas fa-file-alt fa-3x";
      icon.style.color = "#007bff";
      previewItem.appendChild(icon);
    }

    // progress bar container
    const progressContainer = document.createElement("div");
    progressContainer.classList.add("progress-bar-container");
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressContainer.appendChild(progressBar);
    previewItem.appendChild(progressContainer);

    // simulate upload
    setTimeout(() => {
      progressBar.style.width = "100%"; // simulate full progress
    }, 500);

    // filename
    const name = document.createElement("div");
    name.classList.add("file-name");
    name.textContent = file.name;
    previewItem.appendChild(name);

    previewContainer.appendChild(previewItem);
  });
}

sendBtn.addEventListener("click", () => {
  if (selectedFiles.length === 0) {
    alert("من فضلك اختر ملفات أولاً");
  } else {
    successMessage.style.display = "block";
  }
});

// لما يضغط على زر الحذف
function assignFun(){
  document.querySelectorAll(".remove_btn").forEach((button) => {
    button.addEventListener("click", function () {
      const memberRow = this.closest(".team-card");
      memberRow.remove();
    });
  });
}
assignFun();
// تعديل الاسم و اللوجو و البايو

function changeTeamLogo(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("teamLogo").src = e.target.result;
      api.teamLogo = e.target.result;
      sendUpdate();
    };
    reader.readAsDataURL(file);
  }
}

function editTeamName() {
  const nameElement = document.getElementById("teamName");
  const input = document.getElementById("teamNameInput");
  input.value = nameElement.innerText.trim();
  nameElement.style.display = "none";
  input.style.display = "inline";
  input.onblur = function () {
    nameElement.textContent = input.value;
    input.style.display = "none";
    nameElement.style.display = "block";
    teamData.teamName = input.value;
    console.log(input.value);
    sendUpdate();
  };
}

function editBio() {
  const bio = document.querySelector('#teamBio p');
  const input = document.getElementById("teamBioInput");
  const saveBtn = document.getElementById("saveBioBtn");
  input.value = bio.innerText.trim();
  document.querySelector('#teamBio').style.display = "none";
  input.style.display = "block";
  saveBtn.style.display = "inline-block";
}

function saveBio() {
  const input = document.getElementById("teamBioInput");
  const bio = document.querySelector('#teamBio p');
  const saveBtn = document.getElementById("saveBioBtn");
  bio.textContent = input.value

  document.querySelector("#teamBio i").onclick = editBio;
  bio.parentElement.style.display = "flex";
  input.style.display = "none";
  saveBtn.style.display = "none";
  teamData.teamBio = input.value;
  sendUpdate();
}
// ----------------------------------------- send request to doctor -------------------------------


// عرض الفيدباك من localStorage
// const feedbackContainer = document.querySelector(
//   ".DoctorFeedback .feedback-section"
// );

// function renderFeedback() {
//   const feedbacks = JSON.parse(localStorage.getItem("teamFeedbacks") || "[]");

//   feedbacks.forEach((fb) => {
//     const card = document.createElement("div");
//     card.className = "feedback-card success";
//     card.innerHTML = `
//             <div class="feedback-header">
//                 <div class="doctor-info">
//                     <img src="https://i.pravatar.cc/40?u=${encodeURIComponent(
//                       fb.doctor
//                     )}" alt="دكتور" />
//                     <strong>${fb.doctor}</strong>
//                 </div>
//                 <span class="feedback-date">${fb.date}</span>
//             </div>
//             <div class="feedback-body">
//                 ✅ ${fb.content}
//             </div>
//         `;
//     feedbackContainer.appendChild(card);
//   });
// }

async function sendUpdate() {
  try {
    const response = await fetch(editTeamUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(teamData),
    });
    console.log(teamData);

    // if (!response.ok) {
    //   const err = await response.text();
    //   console.error("Failed:", response.status, err);
    // } else {
    //   const data = await response.json();
    //   console.log("Updated:", data);
    // }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
// تشغيله مباشرة
// renderFeedback();