# Share Tabs with Gmail

**Share Tabs with Gmail** is a Firefox addon that collects the titles and URLs of open tabs and shares them via Gmail.

![Addon Icon](assets/icons/icon.png "Addon Icon")

## Features

- Collects tab information (titles and URLs) and composes an email in Gmail, opened in a new tab, with:
  - **Recipient Email**: Left empty unless optionally set via the addon’s settings page.
  - **Subject**: Automatically generated based on the titles of the collected tabs.
  - **Body**: A formatted HTML list of links using the collected titles and URLs.
- Clicking the icon shares all tabs in the current window (default key binding: <kbd>Alt+Shift+J</kbd>).
- If a selection is active, only the highlighted tabs are shared. To select multiple tabs with the mouse, hold down <kbd>Ctrl</kbd>.
- Clicking the icon while holding <kbd>Shift</kbd> shares only the currently active tab (default key binding: <kbd>Alt+Shift+K</kbd>).

![Example](assets/images/example.png "Example")

## Project Structure

```
├── src
│   ├── background.js       # Handles tab collection and Gmail integration
│   ├── contentScript.js    # Injects HTML content into Gmail's compose window
│   ├── options.html        # Options page structure
│   ├── options.js          # Logic for saving and managing options
│   └── manifest.json       # Firefox add-on configuration
├── package.json            # npm configuration for build and scripts
└── README.md               # Documentation for the project
```

## Usage

- **Share All Tabs**: Click the addon icon or press <kbd>Alt+Shift+J</kbd> to share all open tabs in the current window via Gmail.
- **Send Selected Tabs**: If tab selection is active, only the selected tabs will be shared.
- **Send Current Tab**: Hold <kbd>Shift</kbd> and click the icon or press <kbd>Alt+Shift+K</kbd> to share only the active tab.
- **Set a Default Recipient**: Use the settings page to specify a default email recipient. If not set, the Gmail draft will have an empty "To" field.
- **Subject Line Separator**: When sharing multiple tabs, the titles of up to four tabs are included in the subject line, separated by a customizable separator. By default, the separator is ` | `, but you can change it in the addon’s settings. If there are more than four tabs, only the first four titles are shown, and they may be truncated.
- **Change Key Bindings**: Right-click the addon icon, select **Manage Extension**, click the gear icon, and then choose **Manage Extension Shortcuts**.
- **Note on Gmail Drafts**: Gmail automatically saves drafts for all composed emails. If you do not send the email, a draft will remain in your Gmail Drafts folder.

### Preferences

The following options can be set:

![Preferences](assets/images/options-page.png "Preferences")

## Installation

- Visit the Firefox Add-ons website.
- Search for "Share Tabs with Gmail."
- Click Add to Firefox and follow the prompts to install.

## Permissions

This extension requires the following permissions:

- tabs: To access information about open tabs, such as their titles and URLs.
- storage: To locally store the default recipient email address.
- activeTab: To interact with the currently active tab and inject the email body into Gmail.

## Development

### Prerequisites

- Node.js
- npm

### Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

### Scripts

- `npm run build`: Build the addon using `web-ext`.
- `npm run clean`: Clean the build artifacts.
- `npm run start`: Run the addon in Firefox using `web-ext`.
- `npm run lint`: Lint the addon using `web-ext`.

## License

This project is licensed under the GPLv3 License.
