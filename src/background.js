// This file contains the background script that collects the titles and addresses of all current open tabs.
// It also handles the logic for opening a new tab with the Gmail compose URL, formatted with the recipient email, subject, and body.

// browser.browserAction.onClicked.addListener(() => {
//     openEmailTab();
// });

// const getTabsInfo = async () => {
//     const tabs = await browser.tabs.query({ currentWindow: true });
//     return tabs.map(tab => ({
//         title: tab.title,
//         url: tab.url
//     }));
// };

// const createEmailLink = (email, tabs) => {
//     let subject = '';
//     let body = '<ul>';
//     const separator = ' <|> ';

//     const titles = tabs.map(tab => tab.title);
//     const urls = tabs.map(tab => tab.url);

//     if (tabs.length === 1) {
//         subject = titles[0].substring(0, 160);
//     } else if (tabs.length === 2) {
//         subject = titles.slice(0, 2).map(title => title.substring(0, 80)).join(separator);
//     } else if (tabs.length === 3) {
//         subject = titles.slice(0, 3).map(title => title.substring(0, 60)).join(separator);
//     } else {
//         subject = titles.slice(0, 4).map(title => title.substring(0, 40)).join(separator);
//     }

//     tabs.forEach((tab, index) => {
//         body += `<li><a href="${tab.url}">${tab.title}</a></li>`;
//     });
//     body += '</ul>';

//     return {
//         url: `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`,
//         body: body
//     };
// };

// const openEmailTab = async () => {
//     const email = await browser.storage.local.get('email');
//     const tabs = await getTabsInfo();
//     const emailLink = createEmailLink(email.email, tabs);
//     const tab = await browser.tabs.create({ url: emailLink.url });

//     // Send a message to the content script to inject the HTML body
//     browser.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
//         if (tabId === tab.id && changeInfo.status === 'complete') {
//             browser.tabs.sendMessage(tabId, { body: emailLink.body });
//             browser.tabs.onUpdated.removeListener(listener);
//         }
//     });
// };

browser.browserAction.onClicked.addListener((tab, onClickData) => {
    if (onClickData.modifiers.includes("Shift")) {
        openEmailTab(true);
    } else {
        openEmailTab(false);
    }
});

const getTabsInfo = async (currentOnly) => {
    const tabs = currentOnly ? [await browser.tabs.getCurrent()] : await browser.tabs.query({ currentWindow: true });
    return tabs.map(tab => ({
        title: tab.title,
        url: tab.url
    }));
};

const createEmailLink = (email, tabs) => {
    let subject = '';
    let body = '<ul>';
    const separator = ' <|> ';

    const titles = tabs.map(tab => tab.title);
    const urls = tabs.map(tab => tab.url);

    if (tabs.length === 1) {
        subject = titles[0].substring(0, 160);
    } else if (tabs.length === 2) {
        subject = titles.slice(0, 2).map(title => title.substring(0, 80)).join(separator);
    } else if (tabs.length === 3) {
        subject = titles.slice(0, 3).map(title => title.substring(0, 60)).join(separator);
    } else {
        subject = titles.slice(0, 4).map(title => title.substring(0, 40)).join(separator);
    }

    tabs.forEach((tab, index) => {
        body += `<li><a href="${tab.url}">${tab.title}</a></li>`;
    });
    body += '</ul>';

    return {
        url: `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`,
        body: body
    };
};

const openEmailTab = async (currentOnly) => {
    const email = await browser.storage.local.get('email');
    const tabs = await getTabsInfo(currentOnly);
    const emailLink = createEmailLink(email.email, tabs);
    const tab = await browser.tabs.create({ url: emailLink.url });

    // Send a message to the content script to inject the HTML body
    browser.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
            browser.tabs.sendMessage(tabId, { body: emailLink.body });
            browser.tabs.onUpdated.removeListener(listener);
        }
    });
};