const form = document.getElementById('jobForm');
const appsDiv = document.getElementById('applications');
const filter = document.getElementById('filter');
const adminLogin = document.getElementById('adminLogin');
const portal = document.getElementById('portal');

function loginAdmin() {
    const username = document.getElementById('adminUser').value;
    const password = document.getElementById('adminPass').value;
    if (username === 'admin' && password === 'admin123') {
        adminLogin.style.display = 'none';
        portal.style.display = 'block';
    } else {
        alert('Invalid login');
    }
}

function loadApplications() {
    const apps = JSON.parse(localStorage.getItem('applications')) || [];
    const selected = filter.value;
    appsDiv.innerHTML = '';
    apps.forEach((app, index) => {
        if (!selected || app.position === selected) {
            const div = document.createElement('div');
            div.className = 'application';
            div.innerHTML = `
        <strong>${app.name}</strong> applied for <em>${app.position}</em><br>
        <small>${app.email}</small>
        <p>${app.cover}</p>
        <p><a href="${app.resume}" target="_blank">View Resume</a></p>
        <button onclick="deleteApp(${index})">Delete</button>
        <button onclick="editApp(${index})">Edit</button>
      `;
            appsDiv.appendChild(div);
        }
    });
}

function deleteApp(index) {
    let apps = JSON.parse(localStorage.getItem('applications')) || [];
    apps.splice(index, 1);
    localStorage.setItem('applications', JSON.stringify(apps));
    loadApplications();
}

function editApp(index) {
    let apps = JSON.parse(localStorage.getItem('applications')) || [];
    const app = apps[index];
    document.getElementById('name').value = app.name;
    document.getElementById('email').value = app.email;
    document.getElementById('position').value = app.position;
    document.getElementById('cover').value = app.cover;
    apps.splice(index, 1);
    localStorage.setItem('applications', JSON.stringify(apps));
    loadApplications();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const cover = document.getElementById('cover').value;
    const resume = document.getElementById('resume').files[0];

    const reader = new FileReader();
    reader.onload = function() {
        const newApp = {
            name,
            email,
            position,
            cover,
            resume: reader.result
        };
        const apps = JSON.parse(localStorage.getItem('applications')) || [];
        apps.push(newApp);
        localStorage.setItem('applications', JSON.stringify(apps));
        form.reset();
        loadApplications();
    };
    reader.readAsDataURL(resume);
});

filter.addEventListener('change', loadApplications);
loadApplications();
