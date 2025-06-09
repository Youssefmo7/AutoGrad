

const token = localStorage.getItem('userToken');
const api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Seminar/getAllSeminars'
fetch(`${api}`,{method:'GET',headers:{'Authorization':`Bearer ${token}`}}).then(res => res.json()).then(data =>{
    data.forEach(seminar => {
        createSeminar(seminar);
    });
})

let weekly = document.querySelector('.weeklyseminars');
let official = document.querySelector('.officialseminars');

function createSeminar(seminar){
    if(seminar.seminar_Kind == 1 && seminar.doctorId != localStorage.getItem('userId'))
        {console.log('skip'); return;}
    const date = new Date(seminar.time);
    let div = document.createElement('div');
    const month = Months[date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    if(hours > 12) hours -= 12;
    const time = `${hours}:${minutes}`;
    const reqs = seminar.requirements;
    const day = date.getDate();
    div.innerHTML =
    `
    <div class="seminar">
        <h5>Seminar</h5>
        <div class="date">
            <div class="hour"><i class="fa-regular fa-clock"></i> <span>${time} ${period}</span></div>
            <div class="day">
                <i class="fa-regular fa-calendar-check"></i>
                <span>${month}</span>
                <span>${day}</span>
            </div>
        </div>
        <div class="progress">
            <div class="requirments">
                <h5>requirments</h5>
                <p>${reqs}</p>
            </div>
        </div>
    </div>
    `
    if(seminar.seminar_Kind == 1) console.log('week');
    if(seminar.seminar_Kind == 1) weekly.appendChild(div);
    else official.appendChild(div);
}







const openModal = document.getElementById("openModal");
const seminarModal = document.getElementById("seminarModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
openModal.onclick = () => (seminarModal.style.display = "flex");
closeModal.onclick = () => (seminarModal.style.display = "none");
cancelBtn.onclick = () => (seminarModal.style.display = "none");
// Toggle logic
let type = 'weekly';
const seminarBtn = document.getElementById("seminarBtn");
const weeklyBtn = document.getElementById("weeklyBtn");
seminarBtn.onclick = () => {
    seminarBtn.classList.add("active");
    weeklyBtn.classList.remove("active");
    type = 'official';
};
weeklyBtn.onclick = () => {
    weeklyBtn.classList.add("active");
    seminarBtn.classList.remove("active");
    type = 'weekly';
};

const Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
document.querySelector('#seminarModal .actions .create-btn').addEventListener('click', (e) => {
    let newSeminar = document.createElement('div');
    const time = document.querySelector('.time-date-inputs input[type="time"]').value;
    const dateInput = document.querySelector('.time-date-inputs input[type="date"]').value;
    const date = new Date(dateInput);
    const reqs = document.querySelector('.requirements textarea').value;
    const day = date.getDate();
    const month = Months[date.getMonth()];
    const period = parseInt(time.split(":")[0]) >= 12 ? 'pm' : 'am';
    newSeminar.innerHTML = 
    `
    <div class="seminar">
    <h5>Seminar</h5>
    <div class="date">
    <div class="hour"><i class="fa-regular fa-clock"></i> <span>${time} ${period}</span></div>
    <div class="day">
    <i class="fa-regular fa-calendar-check"></i>
                <span>${month}</span>
                <span>${day}</span>
            </div>
        </div>
        <div class="progress">
            <div class="requirments">
                <h5>requirments</h5>
                <p>${reqs}</p>
            </div>
        </div>
    </div>
    `
    if(type === 'official')
        document.querySelector('.officialseminars').appendChild(newSeminar);
    else
        document.querySelector('.weeklyseminars').appendChild(newSeminar);
    seminarModal.style.display = "none";
    const seminar = {
        requirements: reqs,
        time: `${date.toISOString()}`,
        doctorId: localStorage.getItem('userId'),
        teamName: null,
        seminar_Kind: (type === 'weekly') * 1
    }
    console.log(seminar);
    // yyyy-MM-dd HH:mm:ss
    try{
        const api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Seminar/CreateSeminar'
        const response = fetch(`${api}`, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(seminar)
        })
    } catch(err){console.log(err);}
})