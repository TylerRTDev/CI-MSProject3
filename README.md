# LingoLink - Track & Learn Words Across Languages

## Table of Contents

- [User Experience (UX)](#-user-experience-ux)
  - [Project Goals](#project-goals)
  - [Target Audience](#target-audience)
  - [User Goals](#user-goals)
  - [Color Scheme](#color-scheme)
  - [Typography](#typography)
  - [Wireframes](#wireframes)

- [Features](#-features)
  - [General](#general)
  - [Landing Page](#landing-page)
  - [Not Implemented](#not-implemented)

- [Technologies Used](#-technologies-used)
  - [Languages Used](#languages-used)
  - [Frameworks, Libraries and Programs Used](#frameworks-libraries-and-programs-used)

- [Testing](#-testing)
  - [Testing User Stories](#testing-user-stories)
  - [Code Validation](#code-validation)
  - [Accessibility](#accessibility)
  - [Tools Testing](#tools-testing)
  - [Manual Testing](#manual-testing)

- [Finished Product](#-finished-product)

- [Deployment](#-deployment)
  - [GitHub Pages](#github-pages)

- [Credits](#credits)
  - [Content](#content)
  - [Media](#media)
  - [Code](#code)

- [Testing Documentation](TESTING.md)

## 🧠 User Experience (UX)

### Project Goals

The goal of this project is to create a multilingual vocabulary tracker called **LingoLink**, designed to help users build and manage their vocabulary across multiple languages. The app provides a smooth user interface for adding, editing, and deleting vocabulary entries, each with support for translations, pronunciation, and categorisation. It is built mobile-first to ensure usability on all screen sizes, and integrates with a backend database to persist user data.

### Target Audience

- Language learners at any stage — beginners to advanced
- Multilingual individuals managing vocabularies across several languages
- Students studying languages in school or university
- Anyone wanting to track vocabulary consistently and efficiently

### User Goals

- Add new words with translations and optional pronunciation or category
- View all added words in an organized card format
- Edit existing entries quickly using a clean modal interface
- Delete entries they no longer want
- Use the app seamlessly across mobile and desktop devices

### Color Scheme

The color scheme is inspired by the Lithuanian flag, consisting of:

- **Yellow** (`#fdd835`) – Used for primary buttons and highlights
- **Green** (`#388e3c`) – Used in headers and UI accents
- **Red** (`#d32f2f`) – Used for alerts, delete buttons, and emphasis
- **White** (`#ffffff`) – Used for background panels and forms
- **Dark Grey** (`#212121`) – Used for body text and header contrast
- **Light Grey** (`#f5f5f5`) – Used for background and section separation

This palette was chosen for its brightness, contrast, and accessibility.

### Typography

The primary font used is:

- **Segoe UI**, with fallbacks: `Tahoma, Geneva, Verdana, sans-serif`

This typeface was selected for its clean readability, strong support across browsers, and familiarity in modern UIs.

### Wireframes

Wireframes were created to plan the mobile-first layout and user interaction flow.

- Mobile wireframes focus on a vertical stacking structure, prioritising form inputs and large tap targets.
- Desktop layouts make use of central alignment and spacing for easy readability.

_ Wireframe screenshots will be added here in the final version._

---

## 🌟 Features

LingoLink is a full-stack language learning tool that helps users add, manage, and track vocabulary across multiple languages. It includes the following core features:

### ✅ General Features
- Add a new word with optional pronunciation and category
- Add multiple translations for each word
- Edit word entries via modal pop-up
- Delete entries with confirmation handling
- Form validation to ensure translations are always present
- Responsive UI optimized for mobile and desktop

### 🖼 Landing Page
- Includes branding, tagline, and call-to-action
- Gradient hero background and animated transitions
- Sticky navigation bar with login/register buttons

### 📋 Word Catalogue
- Displays all user-added words
- Each word card shows the base word, pronunciation, and its translations
- "Edit" button opens modal with prefilled inputs
- "Delete" button removes the word and updates the UI

### 🛠 Not Implemented (Planned Features)
- User authentication (login/register)
- Challenge mode / gamification
- Favourites and categories filtering
- Audio pronunciation.

---

## 🧰 Technologies Used

### Languages Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Python (Flask backend)
- MongoDB
- Render (Cloud Deployment)

### Frameworks, Libraries and Programs Used
- [Flask](https://flask.palletsprojects.com/) – Python web framework for API and backend logic
- [PyMongo](https://pymongo.readthedocs.io/) – Interact with MongoDB Atlas
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – Cloud-hosted NoSQL database
- [Render](https://render.com) – Deployed Flask backend
- [GitHub Pages](https://pages.github.com/) – Deployed frontend
- [Postman](https://www.postman.com/) – Manual API testing
- [dotenv](https://pypi.org/project/python-dotenv/) – Manage environment variables

### Data Model

Each word in the MongoDB collection follows this structure:

```json
{
  "word": "Hello",
  "language": "English",
  "pronunciation": "heh-lo",
  "category": "Greeting",
  "translations": {
    "Lithuanian": "Labas",
    "French": "Bonjour"
  }
}
```

- All fields are optional except the `word` and at least one `translation`.
- `translations` is a key-value object where each key is a language name and the value is its corresponding translation.


---

## ✅ Testing

### Testing User Stories
See [TESTING.md](TESTING.md) for detailed scenarios and coverage.

### Code Validation
- HTML, CSS, and JavaScript code validated using official W3C and ESLint tools.

### Accessibility
- Semantic HTML tags used for structure.
- High contrast button colors.
- Font sizes adjusted for readability on mobile.

### Tools Testing
- Postman used to test GET, POST, PUT, DELETE routes.
- Console and network tabs in dev tools for live debugging.

### Manual Testing
- Multiple form submissions tested.
- Error scenarios handled with alerts.
- Responsiveness tested on Chrome and Firefox developer tools.

---

## 🚀 Deployment

This project is deployed using two services:

### 🔧 Backend (Flask API)
- Hosted on: [Render](https://render.com)
- Repository includes `requirements.txt`, `Procfile`, and `.env` (not tracked).
- Environment Variables:
  - `MONGO_URI` — Secure database connection string
  - `DB_NAME` — MongoDB database name

### 🎨 Frontend (Static Hosting)
- Hosted on: [GitHub Pages](https://github.com/TylerRTDev/CI-MSProject3)
- `scripts.js` connects to the deployed Flask API using the `API_BASE` constant
- No build tool required — app loads directly from `index.html`

---