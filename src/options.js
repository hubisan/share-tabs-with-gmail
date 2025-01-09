// This file contains the JavaScript logic for the options page. 
// It handles saving the email address to storage and retrieving it when the options page is loaded.

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const form = document.getElementById('email-form');
    const statusDiv = document.getElementById('status');

    // Load the saved email address from storage
    browser.storage.local.get('email').then((result) => {
        if (result.email) {
            emailInput.value = result.email;
        }
    });

    // Save the email address to storage when the form is submitted
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value;
        browser.storage.local.set({ email: email }).then(() => {
            statusDiv.textContent = 'Email address saved!';
        });
    });
});

