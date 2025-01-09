browser.runtime.onMessage.addListener((message) => {
    if (message.body) {
        const injectBody = (retries = 10) => {
            const editableDiv = document.querySelector("div[contenteditable='true']");
            if (editableDiv) {
                editableDiv.innerHTML = message.body;
            } else if (retries > 0) {
                setTimeout(() => injectBody(retries - 1), 500);
            }
        };
        injectBody();
    }
});