/*
 * Copyright (C) 2025 Daniel Hubmann
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License Version 3.
 * See the LICENSE file for details.
 * 
 * This file contains the background script that collects the titles and
 * addresses of all current open tabs. It also handles the logic for opening a
 * new tab with the Gmail compose URL, formatted with the recipient email,
 * subject, and body.
 */

browser.browserAction.onClicked.addListener((tab, onClickData) => {
    if (onClickData.modifiers.includes("Shift")) {
        shareActiveTab();
    } else {
        shareAllTabs();
    }
});

browser.commands.onCommand.addListener((command) => {
    if (command === "share-all-tabs") {
        shareAllTabs();
    } else if (command === "share-active-tab") {
        shareActiveTab();
    }
});

const getTabsInfo = async (currentOnly) => {
    let tabs;
    const activeTab = await browser.tabs.query({ active: true, currentWindow: true });
    if (currentOnly) {
        tabs = activeTab;
    } else {
        tabs = await browser.tabs.query({ highlighted: true, currentWindow: true });
        if (tabs.length === 0 || (tabs.length === 1 && tabs[0].id === activeTab[0].id)) {
            tabs = await browser.tabs.query({ currentWindow: true });
        }
    }
    return tabs.map(tab => ({
        title: tab.title,
        url: tab.url
    }));
};

const createEmailLink = async (email, tabs) => {
    let subject = '';
    let body = '<ul>';
    const storageData = await browser.storage.local.get(['separator']);
    const separator = storageData.separator || ' | ';

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
        body += `<li><a href="${tab.url}">${tab.title}</a><br></li>`;
    });
    body += '</ul>';

    return {
        url: `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`,
        body: body
    };
};

const openEmailTab = async (tabs) => {
    const storageData = await browser.storage.local.get(['email']);
    const email = storageData.email || '';
    const emailLink = await createEmailLink(email, tabs);
    const tab = await browser.tabs.create({ url: emailLink.url });

    // Send a message to the content script to inject the HTML body
    browser.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
            browser.tabs.sendMessage(tabId, { body: emailLink.body });
            browser.tabs.onUpdated.removeListener(listener);
        }
    });
};

const shareAllTabs = async () => {
    const tabs = await getTabsInfo(false);
    await openEmailTab(tabs);
};

const shareActiveTab = async () => {
    const tabs = await getTabsInfo(true);
    await openEmailTab(tabs);
};
