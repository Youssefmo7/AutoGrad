

let docTeams = await getDocTeams();

async function getDocTeams(){
    const response = await fetch(`https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/GetTeamsOfDoctor`,{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    })
    return await response.json();
}
console.log(docTeams)
let teamData = await getTeamData();

async function getTeamData(){
    const response = await fetch(`https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/GetTeamData?teamId=${docTeams[0].id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    })
    return await response.json();
}

document.querySelector('.logoAndName h4').textContent = teamData.teamName;
document.querySelector('.teaminfo #bio').textContent = teamData.teamBio;

let members = document.querySelector('.members');
teamData.students.forEach(student => {
  let mem = document.createElement('div');
  mem.classList.add('student');
  mem.innerHTML = `
    <div class="imagebox"><img src="images/Generic avatar.png" alt=""></div>
    <div class="nameId">
        <h5>${student.name}</h5>
        <h5>${student.academicId}</h5>
    </div>
  `
  members.appendChild(mem);
})