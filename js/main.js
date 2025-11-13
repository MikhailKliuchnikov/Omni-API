// Main file for app initialization and coordination

import { initNavigation } from './navigation.js';
// import { initWeather } from './features/weather.js';
// import { initAiAgent } from './features/ai-agent.js';
// import { initNews } from './features/news.js';
import { initFacts } from './features/cool-facts.js';

// ... import other feature modules

// Initialize all modules  
function initApp() {
    initNavigation();
   // initWeather();
   // initAiAgent();
   // initNews();
    initFacts();
}

document.addEventListener('DOMContentLoaded', initApp);