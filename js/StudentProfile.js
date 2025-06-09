const token = localStorage.getItem('userToken');
if(!token){window.location.href = 'index.html';}
await getUserData();



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

async function getUserData() {
    try {
        const api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Student';
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

// academicIDNumber: "200017700"
// bio: null
// creaditHours: 0
// department: null
// firstName: "dasdas"
// gpa: 0
// lastName: "sdds"
// middleName: "sada"
// phoneNumber: "01007448411"
// photoUrl: null
// track: null
// email: 
// grades: 




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
document.querySelector('.Notification-btn').onclick = () => openModal();
document.querySelector('.modal-content .close-btn').onclick = () => closeModal();

function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// لما يضغط على زر الحذف
document.querySelectorAll(".remove_btn").forEach((button) => {
    button.addEventListener("click", function () {
        const memberRow = this.closest(".team-card");
        memberRow.remove();
    });
});

// لما يضغط على زر الحذف
document.querySelectorAll(".approve_btn").forEach((button) => {
    button.addEventListener("click", function () {
        const memberRow = this.closest(".team-card");
        memberRow.remove();
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

// حذف العضو
document.querySelectorAll(".remove_btn").forEach((button) => {
    button.addEventListener("click", function () {
        const memberRow = this.closest(".team-card");
        memberRow.remove();
        updateNotificationCount();
    });
});
