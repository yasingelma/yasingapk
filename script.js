function displayApps(apps) {
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = '';
    
    apps.forEach(app => {
        const appSlug = encodeURIComponent(app.name.trim());
        const card = `
            <div class="card">
                <span class="badge-new">New</span>
                <a href="download.html?name=${appSlug}" style="text-decoration:none; color:inherit;">
                    <img src="${app.icon_url}" class="app-icon" alt="${app.name}">
                    <h3 class="app-name">${app.name}</h3>
                    <div class="card-meta">
                        <span class="card-rating"><i class="fa fa-star"></i> 4.8</span>
                        <span class="card-size">${app.size || 'Varies'}</span>
                    </div>
                    <span class="btn-dl">Download</span>
                </a>
            </div>
        `;
        appContainer.innerHTML += card;
    });
}
