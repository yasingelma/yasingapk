let allApps = [];

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const searchInput = document.getElementById('search');

    // 1. Load data from apps.json
    fetch('apps.json')
        .then(res => {
            if (!res.ok) throw new Error("Could not load apps.json");
            return res.json();
        })
        .then(data => {
            allApps = data;
            
            // Check if user arrived from a search on the download page
            const params = new URLSearchParams(window.location.search);
            const initialSearch = params.get('search');

            if (initialSearch && searchInput) {
                searchInput.value = initialSearch;
                const filtered = allApps.filter(a => 
                    a.name.toLowerCase().includes(initialSearch.toLowerCase()) || 
                    a.category.toLowerCase().includes(initialSearch.toLowerCase())
                );
                renderByCategory(filtered);
            } else {
                renderByCategory(allApps);
            }
        })
        .catch(err => {
            console.error("Error:", err);
            if(appContainer) appContainer.innerHTML = `<p style="text-align:center; padding:50px;">Error loading apps. Please check your apps.json file.</p>`;
        });

    // 2. Search logic for Homepage Hero
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const filtered = allApps.filter(app => 
                app.name.toLowerCase().includes(val) || 
                app.category.toLowerCase().includes(val)
            );
            renderByCategory(filtered);
        });
    }
});

/**
 * Renders apps grouped by their category
 */
function renderByCategory(apps) {
    const container = document.getElementById('app-container');
    if (!container) return;
    
    container.innerHTML = ''; // Clear container

    if (apps.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px;">No apps found matching your search.</p>';
        return;
    }

    // Get unique categories
    const categories = [...new Set(apps.map(app => app.category))];

    categories.forEach(cat => {
        const catApps = apps.filter(a => a.category === cat);
        
        const section = document.createElement('div');
        section.className = 'category-section';
        section.style.marginBottom = "40px";

        section.innerHTML = `
            <div class="section-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h2 style="font-size:1.3rem; border-left:4px solid #ff7e00; padding-left:10px; margin:0;">${cat}</h2>
                <a href="#" style="color:#ff7e00; text-decoration:none; font-size:0.8rem; font-weight:bold;">View All</a>
            </div>
            <div class="grid-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px;">
                ${catApps.map(app => `
                    <div class="card" style="border: 1px solid #e0e0e0; padding: 12px; border-radius: 12px; text-align: center; background: #fff;">
                        <a href="download.html?name=${encodeURIComponent(app.name)}" style="text-decoration:none; color:inherit;">
                            <div class="card-icon-wrapper" style="width:70px; height:70px; margin: 0 auto 10px;">
                                <img src="${app.icon_url}" class="app-icon" style="width:100%; height:100%; border-radius:15px; object-fit:cover;">
                            </div>
                            <p style="font-weight:700; font-size:0.85rem; margin:5px 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${app.name}</p>
                            <div class="star-rating" style="color:#ffc107; font-size:0.75rem; margin-bottom:5px;">
                                <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                            </div>
                            <p style="font-size:0.65rem; color:#888; margin:0;">${app.size || 'Varies'}</p>
                            <span class="btn-details" style="display:block; background:#f0f0f0; color:#333; text-align:center; padding:6px; border-radius:6px; font-weight:700; font-size:0.75rem; margin-top:10px; border:1px solid #ddd;">Details</span>
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

/**
 * Filter function for Dropdown menu
 */
function filterCat(catName) {
    const filtered = allApps.filter(a => a.category === catName);
    renderByCategory(filtered);
    // Scroll to apps section smoothly
    const appSection = document.getElementById('app-container');
    if(appSection) appSection.scrollIntoView({ behavior: 'smooth' });
}
