// This file contains the JavaScript logic for the options page. It handles
// saving and retrieving the email and separator preferences using browser storage.

document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const separatorInput = document.getElementById('separator');
    const form = document.getElementById('options-form');
    const statusDiv = document.getElementById('status');

    // Load the saved email address and separator from storage
    browser.storage.local.get(['email', 'separator']).then((result) => {
        if (result.email) {
            emailInput.value = result.email;
        }
        if (result.separator) {
            separatorInput.value = result.separator;
        }
    });

    // Save the email address and separator to storage when the form is submitted
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        const separator = separatorInput.value;

        browser.storage.local.set({ email, separator }).then(() => {
            // Show confirmation message
            statusDiv.textContent = 'Options saved!';
            statusDiv.style.display = 'block';

            // Hide the message after 3 seconds
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 3000);
        });
    });
});
