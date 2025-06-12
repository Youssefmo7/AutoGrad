document.querySelector('.noTeam button').addEventListener('click', (e) => {
    let popup = document.querySelector('.popUp');
    popup.style.display = 'flex';
    document.querySelector('.popUp button').addEventListener('click', (e) => {
        let name = document.querySelector('.popUp #name').value;
        let logo = document.querySelector('.popUp #logo').value;
        const api = 'https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Team/CreateTeam'
        const response = fetch(`${api}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify({
                name: `${name}`,
                logoUrl: `${logo}`
            })
        });
        popup.style.display = 'none';
        window.location.href = 'EditTeamProfile.html';
    })
})