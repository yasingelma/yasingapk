document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const searchInput = document.getElementById('search');
    const categoryLinks = document.querySelectorAll('.dropdown-content a');
    let allApps = [];

    // Load data from apps.json
    fetch('apps.json')
        .then(res => res.json())
        .then(data => {
            allApps = data;
            displayApps(allApps);
            checkURLParams(); // For search redirects
        });

    function displayApps(apps) {
        if (!appContainer) return;
        appContainer.innerHTML = '';
        apps.forEach(app => {
            const appSlug = encodeURIComponent(app.name.trim());
            appContainer.innerHTML += `
                <div class="card">
                    <span class="badge-new">NEW</span>
                    <a href="download.html?name=${appSlug}" style="text-decoration:none; color:inherit;">
                        <div class="card-icon-wrapper">
                            <img src="${app.icon_url}" class="app-icon" onerror="this.src='https://via.placeholder.com/80?text=APK'">
                        </div>
                        <h3 class="app-name">${app.name}</h3>
                        <div class="card-meta">
                            <span><i class="fa fa-star" style="color:#ffc107"></i> 4.8</span>
                            <span>${app.size || 'Varies'}</span>
                        </div>
                        <span class="btn-dl">Details</span>
                    </a>
                </div>`;
        });
    }

    // Hero Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allApps.filter(app => 
                app.name.toLowerCase().includes(term) || app.category.toLowerCase().includes(term)
            );
            displayApps(filtered);
        });
    }

    // Dropdown Category Filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const cat = e.target.innerText;
            const filtered = (cat === "All") ? allApps : allApps.filter(a => a.category === cat);
            displayApps(filtered);
            document.getElementById('apps').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Support for search coming from download page
    function checkURLParams() {
        const params = new URLSearchParams(window.location.search);
        const searchVal = params.get('search');
        if (searchVal && searchInput) {
            searchInput.value = searchVal;
            searchInput.dispatchEvent(new Event('input'));
        }
    }
});
