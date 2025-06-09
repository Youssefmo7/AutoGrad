const token = localStorage.getItem("userToken");
if (!token) window.location.href = "index.html";
await getDoctorData();

const user = JSON.parse(localStorage.getItem("userData"));
const userName = `${user.firstName} ${user.middleName} ${user.lastName}`;
document.querySelector(".personalInfo .name").textContent = userName;
document.querySelector(".personalInfo .number").textContent = user.academicIDNumber;
document.querySelector(".info .bio").textContent = user.bio;
document.querySelector(".TeamsNum .num p").textContent = user.numberOfTeams;
document.querySelector(".academicInfo .major ul :nth-child(1)").innerHTML=`<span>Department:</span> ${user.department}`;
document.querySelector(".academicInfo .major ul :nth-child(1)").innerHTML=`<span>Office Number:</span> ${user.office_Number}`;
document.querySelector('.contact #Email').textContent = `Email: ${user.email}`;
document.querySelector('.contact #phone').textContent = `Phone: ${user.phone}`;


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


// لما يضغط على زر الحذف
document.querySelectorAll(".remove_btn").forEach((button) => {
  button.addEventListener("click", function () {
    const memberRow = this.closest(".team-card");
    memberRow.remove();
  });
});

//اضافه التيم اللي تم الموافقه عليه في قائمه الفرق

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// حذف العضو
document.querySelectorAll(".remove_btn").forEach((button) => {
  button.addEventListener("click", function () {
    const memberRow = this.closest(".team-card");
    memberRow.remove();
    updateNotificationCount();
  });
});

// الموافقة على العضو
document.querySelectorAll(".approve_btn").forEach((button) => {
  button.addEventListener("click", function () {
    const memberCard = this.closest(".team-card");

    // استخراج الصورة والاسم من كارت العضو
    const imgSrc = memberCard.querySelector("img").src;
    const memberName = memberCard.querySelector("h3").innerText;

    // إنشاء كارت فريق جديد
    const newTeamCard = document.createElement("div");
    newTeamCard.classList.add("team-card");
    newTeamCard.innerHTML = `
                <div class="team-logo">
                    <img src="${imgSrc}" alt="Team Logo">
                </div>
                <div class="team-name">
                    <h3>${memberName.split(" ")[0]}'s Team</h3>
                    <p>The project aims to simplify and organize the graduation process for university students by providing a centralized platform.</p>
                </div>
            `;

    // إضافة الكارت إلى قسم الفرق
    const registeredTeamsSection = document.getElementById("registeredTeams");
    registeredTeamsSection.appendChild(newTeamCard);

    // حذف الكارت من المودال
    memberCard.remove();
    updateNotificationCount();
  });
});

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
