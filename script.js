document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const searchInput = document.getElementById('search');
    const categoryLinks = document.querySelectorAll('.dropdown-content a');
    let allApps = [];

    // 1. Fetch the data
    fetch('apps.json')
        .then(res => {
            if (!res.ok) throw new Error("File not found");
            return res.json();
        })
        .then(data => {
            allApps = data;
            displayApps(allApps);
        })
        .catch(err => {
            console.error("JSON Error:", err);
            if(appContainer) appContainer.innerHTML = '<p class="error">Error loading apps. Check apps.json syntax.</p>';
        });

    // 2. Function to display the cards
    function displayApps(apps) {
        if (!appContainer) return; // Exit if not on homepage
        appContainer.innerHTML = '';
        
        apps.forEach(app => {
            // URL friendly name (e.g., "CBE Birr" -> "CBE%20Birr")
            const appSlug = encodeURIComponent(app.name.trim());
            
            const card = `
                <div class="card">
                    <span class="badge-new">NEW</span>
                    <a href="download.html?name=${appSlug}" style="text-decoration:none; color:inherit;">
                        <div class="card-icon-wrapper">
                            <img src="${app.icon_url}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/80?text=APK'">
                        </div>
                        <h3 class="app-name">${app.name}</h3>
                        <div class="card-meta">
                            <span class="card-rating"><i class="fa fa-star" style="color:#ffc107"></i> 4.8</span>
                            <span class="card-size">${app.size || 'Varies'}</span>
                        </div>
                        <span class="btn-dl">Details</span>
                    </a>
                </div>
            `;
            appContainer.innerHTML += card;
        });
    }

    // 3. Search logic (Hero Search)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allApps.filter(app => 
                app.name.toLowerCase().includes(term) || 
                app.category.toLowerCase().includes(term)
            );
            displayApps(filtered);
        });
    }

    // 4. Category Filter logic (Dropdown)
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const category = e.target.textContent;
            if (category === "All") {
                displayApps(allApps);
            } else {
                const filtered = allApps.filter(app => app.category === category);
                displayApps(filtered);
            }
            // Jump to app section
            document.getElementById('apps').scrollIntoView({ behavior: 'smooth' });
        });
    });
});
