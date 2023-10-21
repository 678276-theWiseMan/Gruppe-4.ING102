function saveData() {
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const passwordConfirmed = document.getElementById('passwordConfirmed').value;

    const userData = { lastName, firstName, userName, password, passwordConfirmed };
  
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Data lagret.');
}

function loadData() {
    // TODO
}

window.onload = loadData;
