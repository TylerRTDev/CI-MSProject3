# LingoLink Testing Documentation

## 🧪 Testing Strategy Overview

The LingoLink application was tested using a combination of manual testing and external tools throughout the development lifecycle.

- **Manual Testing** was conducted across multiple devices, screen sizes, and browsers to ensure mobile-first responsiveness and core feature functionality.
- **Browser Developer Tools** were used to emulate mobile devices and inspect layout rendering and CSS responsiveness.
- **Form Validation** was tested by submitting empty fields and invalid data (e.g., missing translations).
- **API Testing** was performed using [Postman](https://www.postman.com/) to verify all CRUD endpoints in the Flask backend.
- **Code Quality Validation** tools were used:
  - HTML via [W3C Validator](https://validator.w3.org/)
  - CSS via [Jigsaw](https://jigsaw.w3.org/css-validator/)
  - JavaScript via [JSHint](https://jshint.com/)
  - Python via [flake8](https://flake8.pycqa.org/)
- **Version control** was tracked via Git with regular commits during feature updates and testing cycles.

## Testing User Stories

### As a new user

| Story | Test Description | Result |
|-------|------------------|--------|
| I want to understand what the app is about quickly. | Landing page text and CTA buttons are visible and descriptive. | ✅ Passed |
| I want to start learning immediately. | CTA scrolls to the dashboard section. | ✅ Passed |

### As a frequent user

| Story | Test Description | Result |
|-------|------------------|--------|
| I want to add a new word with multiple translations easily. | Add Word form accepts input, allows adding/removing translation pairs. | ✅ Passed |
| I want to see all words I have added. | Words load correctly from the backend. | ✅ Passed |
| I want to delete a word when I no longer need it. | Delete button removes card from frontend and backend. | ✅ Passed |
| I want to update words using a simple form. | Edit button opens modal, updates values, closes modal. | ✅ Passed |

## 📱 Responsive Testing

LingoLink was tested extensively across multiple devices and screen sizes to confirm its mobile-first responsiveness and consistency. Testing was performed using:

- 🧪 **Responsively App** – for simultaneous cross-device layout validation  
- 🧰 **Chrome DevTools** – for viewport resizing and element inspection  
- 📱 **Physical Devices** – iPhone, Android, and tablets used for live validation

| Device / Emulator     | Browser       | Layout | Functionality | Notes                          |
|------------------------|---------------|--------|----------------|--------------------------------|
| iPhone 13              | Safari        | ✅     | ✅              | Mobile layout stacks cleanly   |
| Samsung Galaxy S21     | Chrome        | ✅     | ✅              | All forms responsive           |
| iPad Air               | Safari        | ✅     | ✅              | Modals adjust appropriately    |
| MacBook Pro            | Chrome        | ✅     | ✅              | Flex layouts align as expected |
| Windows Laptop         | Edge          | ✅     | ✅              | Typography and spacing consistent |
| Responsively (9 viewports) | Chromium | ✅     | ✅              | Uniform display in all breakpoints |
| Chrome DevTools Emulators | Chrome     | ✅     | ✅              | Verified small → large screens |

> _No layout issues or content overflow observed during testing._


## Code Validation

- **HTML**: Validated using W3C Markup Validator.
  - Result: No critical errors found.
- **CSS**: Validated using W3C CSS Validator.
  - Result: All styling passed validation.
  ![css-validator](/resources/images/css-validation.png)
- **JavaScript**: Checked for syntax errors via browser console.
  - Result: No major issues or console warnings.
- **Python (Flask)**: Linted using `flake8`.
  - Result: No blocking errors or unused imports.

## Accessibility

- Color contrast tested via Chrome DevTools accessibility tab.
- Font sizes and padding are mobile-friendly.
- Labels are used appropriately for inputs.
- All buttons are keyboard accessible.
- Modal supports keyboard escape functionality.

## Tools Testing

| Tool            | Purpose                          | Status  |
|----------------|----------------------------------|---------|
| Postman        | API endpoint testing              | ✅ Passed |
| MongoDB Atlas  | Cloud database integration check | ✅ Passed |
| GitHub Pages   | Frontend deployment              | ✅ Passed |
| Render.com     | Backend deployment               | ✅ Passed |

## Manual Testing Matrix

| Feature                  | Action                            | Expected Result                    | Outcome |
|--------------------------|-----------------------------------|------------------------------------|---------|
| Add Word                | Fill form and submit              | Word appears in card list          | ✅     |
| Add Translation Pair    | Click "+ Add Translation" button | New input fields appear            | ✅     |
| Remove Translation Pair | Click ✖ button                 | Pair is removed from form          | ✅     |
| Edit Word               | Click edit, change, and update   | Modal closes, card updates         | ✅     |
| Cancel Edit             | Click cancel                      | Modal closes, no update occurs     | ✅     |
| Delete Word             | Click delete                      | Card disappears from list          | ✅     |
| Load on Page Refresh    | Refresh page                      | Existing words are reloaded        | ✅     |

## ⚙️ JavaScript Functional Testing

The following functions were tested manually and through live user flows to ensure they performed expected actions within the UI and backend.

| Function Name            | Purpose                                      | Tested? | Result | Notes |
|--------------------------|----------------------------------------------|---------|--------|-------|
| `loadWords()`            | Fetch and render all word entries on load    | ✅      | ✅     | Dynamically creates card elements with translation data |
| `addTranslationField()`  | Dynamically adds translation input pairs     | ✅      | ✅     | Used in both Add and Edit forms |
| `handleEditSubmit()`     | Updates a word document via PUT request      | ✅      | ✅     | Fully functional with UI update and backend persistence |
| `closeEditModal()`       | Resets modal, clears fields, hides modal     | ✅      | ✅     | Also resets Add form on modal close |
| `addWordForm submit`     | Submits new word via POST request            | ✅      | ✅     | Confirms validation and backend creation |
| `remove-btn click`       | Removes specific translation input line      | ✅      | ✅     | Works on both Add and Edit forms |
| `delete-btn click`       | Deletes word from backend and UI            | ✅      | ✅     | Fetch call with DELETE method confirmed |
| `edit-btn click`         | Loads word data into modal and opens it      | ✅      | ✅     | Data is parsed from DOM card structure and pre-filled into modal |

> _All functional JS paths were tested through typical user actions and confirmed operational. No major JS runtime errors found in console logs._


## 🐞 Known Bugs & Fixes

Throughout development, several bugs and UX issues were discovered and resolved. This section outlines those findings:

| Bug / Issue Description                             | Status  | Notes / Fix Applied                                             |
|------------------------------------------------------|---------|------------------------------------------------------------------|
| **Translations leaking into Add Word form after editing** | ✅ Fixed | Isolated edit modal fields and cleared `.translations-wrapper` on cancel |
| **Edit button not triggering modal after card redesign** | ✅ Fixed | Adjusted query selectors to account for new HTML structure |
| **Header and hero overlapping on small screens**     | ✅ Fixed | Adjusted `z-index`, `padding-top`, and hero height breakpoints |
| **Modal Cancel button not closing modal**            | ✅ Fixed | Added proper `click` event listener to call `closeEditModal()` |
| **"Add Word" form not resetting after cancel**       | ✅ Fixed | Form reset included in modal close function |
| **Responsive issues on landscape tablets**           | ✅ Fixed | Additional media query added for `min-width: 992px` breakpoints |
| **Shadow overlapping form inputs**                  | ✅ Fixed | Reduced shadow intensity and layered background-image beneath overlay |
| **Hover states hidden under gradient overlays**      | ✅ Fixed | Adjusted `z-index` and `text-fill` positioning for button focus |

> _No unresolved critical bugs currently remain. All functional issues have been resolved and retested._

## 🚀 Deployment & Environment Testing

LingoLink was tested across both local and cloud-hosted environments using environment variables and dynamic API base URLs.

### 🖥️ Local Deployment
- Flask backend tested locally with:
  ```bash
  python app.py
  ```
- `.env` file included:
  ```bash
  MONGO_URI="your-local-or-atlas-uri"
  SECRET_KEY="your_secret_key"
  ```
- JavaScript API base was pointed to:
  ```javascript
  const API_BASE = "http://127.0.0.1:5000";
  ```
- Verified full CRUD operations using browser dev tools and Postman.

### ☁️ Render Deployment (Backend API)
- Backend hosted on Render:
  - Repo root contains `app.py`, `requirements.txt`, and optional `Procfile`
  - Start command: `python app.py`
  - Environment variables:
    ```
    MONGO_URI = [MongoDB Atlas connection string]
    SECRET_KEY = "your_secret_key"
    ```
![render-web-service-production](/resources/images/render-lingolink-production.png)
- Final live API URL:
  ```bash
  https://lingolink-0jc6.onrender.com
  ```
- CRUD routes validated using Postman and browser.

### 🌐 Render Deployment (Frontend - Test Web Service)
- A temporary Render web service was deployed to test frontend cloud hosting.
![render-web-service-testing](/resources/images/render-lingolink-testing.png)
- Testing API URL:
  ```bash
  https://lingolink-testing.onrender.com
  ```
- This service allowed live interaction with the Render backend API.
- GitHub Pages was used for final public deployment, but Render's frontend deployment confirmed as a working alternative.

### 🌍 GitHub Pages Deployment (Live Frontend)
- Final live frontend deployed via GitHub Pages:
  ```
  https://tylerrtdev.github.io/CI-MSProject3/
  ```
- JavaScript code was updated to:
  ```javascript
  const API_BASE = "https://lingolink-0jc6.onrender.com";
  ```
- Confirmed functionality across environments and network types (Wi-Fi, mobile data, incognito modes).

---



