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