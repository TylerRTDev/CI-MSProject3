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

## Code Validation

- **HTML**: Validated using W3C Markup Validator.
  - Result: No critical errors found.
- **CSS**: Validated using W3C CSS Validator.
  - Result: All styling passed validation.
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

---



