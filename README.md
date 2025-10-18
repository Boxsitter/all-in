# All In - Gambling Awareness Experience

Web-based gambling awareness experience built with HTML, CSS, and a custom Twine narrative engine.

## Overview

This project provides a simple, customizable HTML/CSS skeleton with an integrated Twine-like narrative engine for creating interactive storytelling experiences focused on gambling awareness.

## Features

- 📱 **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Easy Customization** - CSS variables make theming simple
- 📖 **Twine-Inspired Engine** - Simple passage-based navigation system
- 🚀 **Zero Dependencies** - Pure HTML, CSS, and vanilla JavaScript
- ♿ **Accessible** - Semantic HTML structure

## Quick Start

1. Clone the repository
2. Open `index.html` in a web browser, or serve with a local web server:
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Using Node.js (with http-server package)
   npx http-server -p 8080
   ```
3. Navigate to `http://localhost:8080`

## File Structure

```
all-in/
├── index.html          # Main HTML structure
├── styles.css          # Styling and theme customization
├── twine-engine.js     # Narrative engine core
├── story-example.js    # Example: How to extend the story (optional)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Customizing the Theme

The CSS uses CSS variables for easy theming. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Main header/footer color */
    --secondary-color: #e74c3c;    /* Accent elements */
    --accent-color: #3498db;       /* Buttons and highlights */
    --background-color: #ecf0f1;   /* Page background */
    --text-color: #2c3e50;         /* Text color */
    --card-background: #ffffff;    /* Content card background */
}
```

## Creating Story Passages

### In HTML (Static)

Add passages directly in `index.html`:

```html
<div class="passage" data-passage="passage-name">
    <h2>Passage Title</h2>
    <p>Your story content here.</p>
    <div class="choices">
        <button class="choice-btn" data-target="next-passage">Choice Text</button>
    </div>
</div>
```

### Using JavaScript (Dynamic)

Use the `TwineHelpers` API to create passages programmatically:

```javascript
TwineHelpers.createPassage(
    'passage-name',              // Passage ID
    'Passage Title',             // Display title
    '<p>Story content</p>',      // HTML content
    [                            // Array of choices
        { text: 'Option 1', target: 'target-passage-1' },
        { text: 'Option 2', target: 'target-passage-2' }
    ]
);
```

## Twine Engine API

The narrative engine exposes a global `Story` object:

```javascript
// Navigate to a passage
Story.showPassage('passage-name');

// Store/retrieve story variables
Story.setVariable('playerName', 'John');
const name = Story.getVariable('playerName');

// Get current passage
const current = Story.getCurrentPassage();

// Get navigation history
const history = Story.getHistory();

// Restart the story
Story.restart();
```

## Adding Choices to Existing Passages

```javascript
TwineHelpers.addChoice(
    'existing-passage',     // Passage to add choice to
    'Choice Text',          // Button text
    'target-passage'        // Where this choice leads
);
```

## Example Story Extension

See `story-example.js` for a complete example of how to extend the skeleton with more passages and story logic. The example demonstrates:

- Creating multiple interconnected passages
- Adding choices to existing passages
- Using story variables to track progress
- Providing gambling awareness resources

To use the example, include it in your HTML after `twine-engine.js`:
```html
<script src="story-example.js"></script>
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Screenshots

### Desktop View
![Desktop View](https://github.com/user-attachments/assets/8fd980ed-367a-4d47-bc2d-182f4f9cc2ce)

### Navigation
![Second Passage](https://github.com/user-attachments/assets/7348dd4f-feb7-4b2b-ace0-4e8dafdadf60)

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/d9195877-cb5f-40f8-9108-5dfd75482065)

## Development

This is a static site with no build process required. Simply edit the files and refresh your browser.

### Best Practices

1. **Organize Passages** - Group related passages together in the HTML
2. **Use Semantic HTML** - Maintain accessibility standards
3. **Test Responsive Design** - Check on multiple device sizes
4. **Keep CSS Variables Consistent** - Maintain visual harmony

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the gambling awareness experience.
