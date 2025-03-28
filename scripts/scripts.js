// Fetch words from the Flask API and display them
async function loadWords() {
try {
    const response = await fetch("http://127.0.0.1:5000/api/words");
    const words = await response.json();

    const dashboard = document.querySelector(".dashboard");
    const wordSection = document.createElement("div");
    wordSection.classList.add("word-cards");

    words.forEach((word) => {
    const card = document.createElement("div");
    card.classList.add("word-card");

    card.innerHTML = `
        <h3>${word.word}</h3>
        <div class="translations">
        ${Object.entries(word.translations)
            .map(([lang, trans]) => `${lang}: ${trans}`)
            .join(" | ")}
        </div>
        <div class="translations">Pronunciation: ${word.pronunciation || "-"}</div>
        <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn" data-id="${word._id}">Delete</button>
        </div>
    `;

    wordSection.appendChild(card);
    });

    dashboard.appendChild(wordSection);
} catch (error) {
    console.error("Error loading words:", error);
}
}

// Handle delete button clicks
document.addEventListener("click", async (e) => {
if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");

    try {
    const res = await fetch(`http://127.0.0.1:5000/api/words/${id}`, {
        method: "DELETE",
    });

    if (res.ok) {
        // Remove the card from the DOM
        e.target.closest(".word-card").remove();
        console.log("✅ Word deleted:", id);
    } else {
        const err = await res.json();
        alert("❌ Failed to delete: " + err.error);
    }
    } catch (error) {
    console.error("Error deleting word:", error);
    }
}
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
    e.target.closest(".translation-pair").remove();
    if (pair) {
        pair.remove();
    }
}
});

document.getElementById("add-word-form").addEventListener("submit", async function (e) {
e.preventDefault();

const word = document.getElementById("word").value.trim();
const language = document.getElementById("language").value.trim();
const pronunciation = document.getElementById("pronunciation").value.trim();
const category = document.getElementById("category").value.trim();
let translations = {};

const langInputs = document.querySelectorAll(".lang");
const transInputs = document.querySelectorAll(".trans");

for (let i = 0; i < langInputs.length; i++) {
    const lang = langInputs[i].value.trim();
    const trans = transInputs[i].value.trim();
    if (lang && trans) {
    translations[lang] = trans;
    }
}

if (Object.keys(translations).length === 0) {
    alert("⚠️ Please add at least one translation.");
    return;
}

const newWord = {
    word,
    language,
    pronunciation,
    category,
    translations
};

try {
    const res = await fetch("http://127.0.0.1:5000/api/words", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newWord)
    });

    if (!res.ok) {
    const error = await res.json();
    alert("❌ Failed to add word: " + error.error);
    return;
    }

    const added = await res.json();
    alert("✅ Word added successfully!");

    // Optionally reload the page or re-fetch words
    window.location.reload();

} catch (error) {
    console.error("Error adding word:", error);
}
});

function addTranslationField() {
    const wrapper = document.getElementById("translations-wrapper");
    const div = document.createElement("div");
    div.classList.add("translation-pair");

div.innerHTML = `
    <input type="text" class="lang" placeholder="Language (e.g. French)" required />
    <input type="text" class="trans" placeholder="Translation (e.g. Bonjour)" required />
    <button type="button" class="remove-btn">✖</button>
`;

wrapper.appendChild(div);
}

// Add one translation field by default when the page loads
window.addEventListener("DOMContentLoaded", () => {
    loadWords();
    addTranslationField();
});
