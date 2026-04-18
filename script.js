function displayApps(apps) {
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = '';
    
    apps.forEach(app => {
        const card = `
            <div class="card">
                <a href="download.html?id=${app.id}" style="text-decoration:none; color:inherit;">
                    <img src="${app.icon_url}" class="app-icon">
                    <h3>${app.name}</h3>
                    <p>${app.category}</p>
                    <span class="btn-dl">Details</span>
                </a>
            </div>
        `;
        appContainer.innerHTML += card;
    });
}
