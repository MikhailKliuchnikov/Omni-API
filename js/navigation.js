// File for managing navigation and rendering views


export function initNavigation() {
    // 
}

// === Function to activate sidebar navigation ===
export function setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('#sidebar-menu li');
    const views = document.querySelectorAll('.view');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetView = document.querySelector(link.dataset.target);
            views.forEach(view => view.classList.remove('active'));
            targetView.classList.add('active');
        });
    });
}
export function renderView(template) {
    const main = document.getElementById('main-section');
    main.innerHTML = '';
    main.appendChild(template.cloneNode(true));
}