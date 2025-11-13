// === COOL FACTS FEATURE MODULE ===
// This module handles the Cool Facts feature of the application.

// Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API Ninjas key
const API_URL = 'https://api.api-ninjas.com/v1/facts?limit=1';

export function initFacts() {
    console.log('Cool Facts module initialized');
    
    // Wait for navigation to render the template, then setup event listeners
    setTimeout(setupFactsFeature, 100);
}

function setupFactsFeature() {
    const factButton = document.getElementById('get-fact-btn');
    const factResult = document.getElementById('fact-result');
    
    if (factButton && factResult) {
        factButton.addEventListener('click', handleGetFact);
        console.log('Cool Facts feature setup complete');
    }
}

async function handleGetFact() {
    const factButton = document.getElementById('get-fact-btn');
    const factResult = document.getElementById('fact-result');
    
    try {
        // Show loading state
        factButton.disabled = true;
        factButton.textContent = 'Loading...';
        factResult.innerHTML = '<p>Fetching a cool fact...</p>';
        
        // Get the fact
        const fact = await getRandomFact();
        
        // Display the fact
        if (fact && fact.fact) {
            factResult.innerHTML = `
                <div style="padding: 15px; background: #f0f0f0; border-radius: 8px; margin-top: 10px;">
                    <h3>🧠 Cool Fact:</h3>
                    <p style="font-size: 1.1em; line-height: 1.4;">${fact.fact}</p>
                </div>
            `;
        } else {
            throw new Error('No fact received from API');
        }
        
    } catch (error) {
        console.error('Error fetching fact:', error);
        factResult.innerHTML = `
            <div style="padding: 15px; background: #ffe6e6; border-radius: 8px; margin-top: 10px; color: #d00;">
                <p><strong>Oops!</strong> Couldn't fetch a fact right now. ${API_KEY === 'YOUR_API_KEY_HERE' ? 'Please add your API key to the cool-facts.js file.' : 'Please try again later.'}</p>
            </div>
        `;
    } finally {
        // Reset button state
        factButton.disabled = false;
        factButton.textContent = 'Get Cool Fact';
    }
}

export async function getRandomFact() {
    // Check if API key is set
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        throw new Error('API key not configured');
    }
    
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 
            'X-Api-Key': API_KEY,
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const facts = await response.json();
    
    // API returns an array, get the first fact
    return facts && facts.length > 0 ? facts[0] : null;
}
