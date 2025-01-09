# Share Tabs with Gmail

**Share Tabs with Gmail** is a Firefox addon that collects the titles and addresses of open tabs and shares them via Gmail.

## Features

- Collects tab information (title and address):
  - **All Tabs**: Default behavior when clicking the addon icon.
  - **Selected Tabs**: Only selected tabs are included (if tab selection is active).
  - **Current Tab**: Collects only the currently active tab (by holding `Shift` while clicking the icon).
- Opens a Gmail compose window pre-filled with:
  - **Recipient Email**: Empty unless optionally set via the addon’s settings page.
  - **Subject**: Automatically generated based on the titles of the tabs collected.
  - **Body**: A neatly formatted HTML list of links using the collected titles and adresses.

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

## Installation

### From AMO

1. Go to the [Firefox Add-ons website](https://addons.mozilla.org/).
2. Search for "Share Tabs with Gmail".
3. Click "Add to Firefox".

## Usage

- **Send All Tabs**:
  - Click the addon icon to send all open tabs via Gmail.

- **Send Current Tab**:
  - Hold `Shift` and click the addon icon to send only the currently active tab.

- **Send Selected Tabs**:
  - If tab selection is active (e.g., via a tab selection addon), only the selected tabs will be included.

- **Set a Default Recipient**:
   - Use the options page to set a default recipient email address. 
   - If no recipient email is set, the "To" field in Gmail will be left empty, and you will need to fill it manually.

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

GPLv3 License