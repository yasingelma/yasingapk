document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const searchInput = document.getElementById('search');

    let allApps = [];

    // 1. Fetch data from your apps.json file
    fetch('apps.json')
        .then(response => response.json())
        .then(data => {
            allApps = data;
            displayApps(allApps);
        })
        .catch(err => {
            console.error("Error loading apps:", err);
            appContainer.innerHTML = '<p>Error loading apps. Please check your apps.json file.</p>';
        });

    // 2. Function to display apps in the APKPure grid style
    function displayApps(apps) {
        appContainer.innerHTML = ''; // Clear the grid
        
        if (apps.length === 0) {
            appContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">No apps found.</p>';
            return;
        }

        apps.forEach(app => {
            // Use a default icon if none is provided in JSON
            const iconUrl = app.icon_url || 'https://via.placeholder.com/72?text=APK';
            
            const card = `
                <div class="card">
                    <img src="${iconUrl}" alt="${app.name}" class="app-icon">
                    <h3>${app.name}</h3>
                    <p>${app.category || 'General'}</p>
                    <a href="${app.download_url}" class="btn-dl">Download</a>
                </div>
            `;
            appContainer.innerHTML += card;
        });
    }

    // 3. Search Filter Logic
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredApps = allApps.filter(app => 
            app.name.toLowerCase().includes(searchTerm) || 
            (app.category && app.category.toLowerCase().includes(searchTerm))
        );
        displayApps(filteredApps);
    });
});
