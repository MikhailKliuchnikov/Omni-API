// File for managing navigation and rendering views

// DOM Elements
let navButton = null;
let navigationSection = null;
let mainSection = null;
let featureItems = null;
let sidebarOverlay = null;

// Templates cache
const templates = {};

// Current active feature
let currentFeature = null;
let sidebarOpen = false;

export function initNavigation() {
    // Get DOM elements
    navButton = document.getElementById('nav-button');
    navigationSection = document.getElementById('sidebar');
    mainSection = document.getElementById('main-section');
    
    createSidebarOverlay();
    
    cacheTemplates();
    
    setupNavigationToggle();
    setupFeatureNavigation();
    setupSidebarCloseHandlers();
    
    // Show welcome view by default
    showWelcomeView();
}

// === Create sidebar overlay ===
function createSidebarOverlay() {
    sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    sidebarOverlay.addEventListener('click', closeSidebar);
    document.body.appendChild(sidebarOverlay);
}


// === Cache all templates for performance ===
function cacheTemplates() {
    templates.welcome = document.getElementById('welcome-template').content;
    templates.weather = document.getElementById('weather-template').content;
    templates.aiAgent = document.getElementById('ai-agent-template').content;
    templates.news = document.getElementById('news-template').content;
    templates.coolFacts = document.getElementById('cool-facts-template').content;
}

// === Setup navigation button toggle ===
function setupNavigationToggle() {
    if (navButton && navigationSection) {
        navButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNavigation();
        });
    }
}

// === Setup sidebar close handlers ===
function setupSidebarCloseHandlers() {
    // Close button (the X in top-right corner)
    navigationSection.addEventListener('click', (e) => {
        const rect = navigationSection.getBoundingClientRect();
        const closeButtonArea = {
            top: 20,
            right: 20,
            width: 40,
            height: 40
        };
        
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Check if click is within the close button area
        if (clickX >= rect.width - closeButtonArea.right - closeButtonArea.width && 
            clickX <= rect.width - closeButtonArea.right &&
            clickY >= closeButtonArea.top && 
            clickY <= closeButtonArea.top + closeButtonArea.height) {
            closeSidebar();
            e.stopPropagation();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebarOpen) {
            closeSidebar();
        }
    });
}

// === Setup feature selection ===
function setupFeatureNavigation() {
    // Get all feature list items
    featureItems = document.querySelectorAll('#sidebar li');
    
    featureItems.forEach((item, index) => {
        item.addEventListener('click', () => handleFeatureSelection(index));
        // Add hover effect
        item.style.cursor = 'pointer';
    });
}

// === Toggle navigation visibility ===
function toggleNavigation() {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    navigationSection.removeAttribute('hidden');
    sidebarOverlay.classList.add('active');
    document.body.classList.add('sidebar-open');
    navButton.textContent = 'Hide Navigation';
    sidebarOpen = true;
}

function closeSidebar() {
    navigationSection.setAttribute('hidden', '');
    sidebarOverlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    navButton.textContent = 'Navigate';
    sidebarOpen = false;
}

// === Handle feature selection ===
function handleFeatureSelection(featureIndex) {
    const features = ['weather', 'aiAgent', 'news', 'coolFacts'];
    const selectedFeature = features[featureIndex];
    
    if (selectedFeature && templates[selectedFeature]) {
        renderView(templates[selectedFeature]);
        currentFeature = selectedFeature;
        
        // Close sidebar with smooth animation
        closeSidebar();
        
        // Initialize the selected feature
        initializeFeature(selectedFeature);
        
        // Add selection feedback
        const selectedItem = document.querySelectorAll('#sidebar li')[featureIndex];
        if (selectedItem) {
            selectedItem.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)';
            setTimeout(() => {
                if (selectedItem) {
                    selectedItem.style.background = '';
                }
            }, 1000);
        }
    }
}

// === Render view in main section ===
export function renderView(template) {
    if (!mainSection) return;
    
    mainSection.innerHTML = '';
    
    const clone = template.cloneNode(true);
    mainSection.appendChild(clone);
}

// === Show welcome view ===
function showWelcomeView() {
    if (templates.welcome) {
        renderView(templates.welcome);
        currentFeature = 'welcome';
    }
}

// === Initialize feature-specific functionality ===
function initializeFeature(featureName) {
    switch (featureName) {
        case 'weather':
            renderView(templates.weather);
            // Will be implemented when weather module is ready
            console.log('Weather feature selected');
            break;
        case 'aiAgent':
            renderView(templates.aiAgent);  
            // Will be implemented when AI module is ready
            console.log('AI Agent feature selected');
            break;
        case 'news':
            renderView(templates.news);
            // Will be implemented when news module is ready
            console.log('News feature selected');
            break;
        case 'coolFacts':
            renderView(templates.coolFacts);
            // Will be implemented when facts module is ready
            console.log('Cool Facts feature selected');
            break;
        default:
            console.log('Unknown feature:', featureName);
    }
}

// === Get current active feature ===
export function getCurrentFeature() {
    return currentFeature;
}

// === Public function to switch to a specific feature ===
export function switchToFeature(featureName) {
    const featureIndex = ['weather', 'aiAgent', 'news', 'coolFacts'].indexOf(featureName);
    if (featureIndex !== -1) {
        handleFeatureSelection(featureIndex);
    }
}
