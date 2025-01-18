/*
 * Copyright (C) 2025 Daniel Hubmann
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License Version 3.
 * See the LICENSE file for details.
 * 
 * This script listens for messages from the browser runtime and injects HTML
 * content into a content-editable `div` on the current webpage. The injection
 * ensures that the content replaces any existing content within the `div`.
 */

browser.runtime.onMessage.addListener((message) => {
    if (message.body) {
        const injectBody = (retries = 10) => {
            const editableDiv = document.querySelector("div[contenteditable='true']");
            if (editableDiv) {
                // Use DOMParser to parse the HTML string
                const parser = new DOMParser();
                const doc = parser.parseFromString(message.body, 'text/html');

                // Clear the existing content
                while (editableDiv.firstChild) {
                    editableDiv.removeChild(editableDiv.firstChild);
                }

                // Append the parsed nodes
                Array.from(doc.body.childNodes).forEach(node => {
                    editableDiv.appendChild(node);
                });
            } else if (retries > 0) {
                setTimeout(() => injectBody(retries - 1), 500);
            }
        };
        injectBody();
    }
});
