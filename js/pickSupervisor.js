
const api = `https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Doctor/GetAllSupervisors`;
let students;
const response = await fetch(`${api}`, {
    headers: {"Authorization": `Bearer ${localStorage.getItem('userToken')}`}}).then(r => r.json()).then(d => students = d);

students.forEach(student => {
    let std = document.createElement('div');
    std.classList.add('std-card');
    std.innerHTML = `
    <div class="std-info">
        <div class="StdPic">
            <img src="pics/dhdh.jpeg" alt="Student pic Logo">
        </div>
        <div class="info">
            <h3>${student.name}</h3>
            <p>Department: ${student.department}</p>
        </div>
    </div>
    `
    let btn = document.createElement('button');
    btn.classList.add("Add-btn");
    btn.textContent = 'Send Request';
    btn.addEventListener('click', async (e) => {
        const response = fetch(`https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/SendRequestToDoctorTeam?doctorId=${student.id}`,{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })
        btn.textContent = 'Request Sent';
        btn.style.cursor = 'default';
    })
    std.append(btn);
    document.querySelector('.ShowStd').append(std);
})
document.querySelector('header .back-btn').addEventListener('click', (e) => goBack());


function goBack() {
    window.history.back();
}
function openModal() {
    document.getElementById("modal").style.display = "flex";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
document.querySelectorAll('.remove_btn').forEach(button => {
    button.addEventListener('click', function () {
        const memberRow = this.closest('.team-card');
        memberRow.remove();
    });
});