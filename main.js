// ==UserScript==
// @name        HorEXT
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.0
// @author      ganamaga
// @description 23. 10. 2024 11:11:49
// ==/UserScript==
const jsonUrl = 'https://raw.githubusercontent.com/vitekform/vitekform.github.io/main/assets/js/blockedsites.json';

fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Assuming data is an array of blocked sites
        const blockedSites = data.blocked || []; // Adjust according to your JSON structure

        // Check if the current document URL includes any blocked site
        const currentUrl = document.URL;
        const isBlocked = blockedSites.some(site => currentUrl.includes(site));

        if (isBlocked) {
            console.log('Access to this site is blocked.');
            document.head.innerHTML = "<title>Website blocked!</title>"
            document.body.innerHTML = "<h1>This website is blocked by your administrator!</h1>";
            // You can redirect or display a message here
        } else {
            console.log('Access granted.');
        }
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });