const API_BASE = "https://lingolink-0jc6.onrender.com";

// Fetch words from the Flask API and display them
async function loadWords() {
    try {
        const response = await fetch(`${API_BASE}/api/words`);
        const words = await response.json();

        const dashboard = document.querySelector(".dashboard");
        const wordSection = document.createElement("div");
        wordSection.classList.add("word-cards");

        words.forEach((word) => {
        const card = document.createElement("div");
        card.classList.add("word-card");

        const translationsText = Object.entries(word.translations)
            .map(([lang, trans]) => `${lang}: '${trans}'`)
            .join("  ¦  \r");

        card.innerHTML = `
            <h1>${word.word} > <span class="word-card-highlight"><i>'${word.pronunciation}'</i></span></h1>
            <div class="translations">${translationsText}</div>
            <div class="translations">Pronunciation: '${word.pronunciation || "-"}'</div>
            <div class="actions">
            <button class="edit-btn" data-id="${word._id}">Edit</button>
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
    const res = await fetch(`${API_BASE}/api/words/${id}`, {
        method: "DELETE"
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

// Handle clicking "Edit" button
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-btn")) {
        const card = e.target.closest(".word-card");

        // Get word details from card
        const word = card.querySelector("h3").textContent;
        const pronunciation = card.querySelectorAll(".translations")[1].textContent.replace("Pronunciation: ", "");
        const translationText = card.querySelectorAll(".translations")[0].textContent;

        // Parse translations from text (e.g. Lithuanian: Labas | French: Bonjour)
        const parts = translationText.split(" | ");
        parts.forEach((pair) => {
        const [lang, trans] = pair.split(": ");
        if (lang && trans) {
            const wrapper = document.getElementById("translations-wrapper");
            const div = document.createElement("div");
            div.classList.add("translation-pair");

            div.innerHTML = `
            <input type="text" class="lang" value="${lang}" required />
            <input type="text" class="trans" value="${trans}" required />
            <button type="button" class="remove-btn">X</button>
            `;

            wrapper.appendChild(div);
        }
        });

        // Store word ID to hidden field
        const id = e.target.getAttribute("data-id");
        document.getElementById("edit-id").value = id;
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
    const editId = document.getElementById("edit-word-id").value;
    const method = editId ? "PUT" : "POST";
    const url = editId
    ? `${API_BASE}/api/words/${editId}`
    : `${API_BASE}/api/words`;

const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newWord),
    });

    const added = await res.json();
    alert("✅ Word added successfully!");

    // Optionally reload the page or re-fetch words
    window.location.reload();

} catch (error) {
    console.error("Error adding word:", error);
    alert("❌ Failed to add word.");
    }
});

function addTranslationField(lang = "", trans = "", target = "add") {
    const wrapperId = target === "edit" ? "edit-translations-wrapper" : "translations-wrapper";
    const wrapper = document.getElementById(wrapperId);

    const div = document.createElement("div");
    div.classList.add("translation-pair");

    div.innerHTML = `
        <input type="text" class="lang" value="${lang}" placeholder="Language" required />
        <input type="text" class="trans" value="${trans}" placeholder="Translation" required />
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">X</button>
    `;

    wrapper.appendChild(div);
}


// Open modal and populate fields
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-btn")) {
        const card = e.target.closest(".word-card");
        const word = card.querySelector("h3").textContent;
        const pronunciation = card.querySelectorAll(".translations")[1].textContent.replace("Pronunciation: ", "");
        const translationText = card.querySelectorAll(".translations")[0].textContent;

        const parts = translationText.split(" | ");
        const translationsWrapper = document.getElementById("edit-translations-wrapper");
        translationsWrapper.innerHTML = "";

        parts.forEach((pair) => {
            const [lang, trans] = pair.split(": ");
            if (lang && trans) {
                addEditTranslationField(lang, trans);
            }
        });

        document.getElementById("edit-word").value = word;
        document.getElementById("edit-pronunciation").value = pronunciation;
        document.getElementById("edit-word-id").value = e.target.getAttribute("data-id");

        document.getElementById("edit-modal").style.display = "block";
    }
});

// Close modal when clicking outside of it
function closeEditModal() {
    document.getElementById("edit-modal").style.display = "none";
    document.getElementById("edit-word-form").reset();
    document.getElementById("edit-translations-wrapper").innerHTML = "";
    document.getElementById("edit-word-id").value = "";
    document.getElementById("add-word-form").reset();
    document.getElementById("translations-wrapper").innerHTML = "";

    const addWrapper = document.getElementById("translations-wrapper");
    addWrapper.innerHTML = "";
    addTranslationField();
}

function addEditTranslationField(lang = "", trans = "") {
    const wrapper = document.getElementById("edit-translations-wrapper");
    const div = document.createElement("div");
    div.classList.add("translation-pair");

    div.innerHTML = `
        <input type="text" class="lang" value="${lang}" placeholder="Language" required />
        <input type="text" class="trans" value="${trans}" placeholder="Translation" required />
        <button type="button" class="remove-btn">✖</button>
    `;

    wrapper.appendChild(div);
}

// Handle remove buttons inside modal
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
        e.target.closest(".translation-pair").remove();
    }
});

// Handle modal form submission
function handleEditSubmit(event) {
    event.preventDefault();

    const id = document.getElementById("edit-word-id").value;
    const word = document.getElementById("edit-word").value.trim();
    const language = document.getElementById("edit-language").value.trim();
    const pronunciation = document.getElementById("edit-pronunciation").value.trim();
    const category = document.getElementById("edit-category").value.trim();

    let translations = {};
    const langInputs = document.querySelectorAll("#edit-translations-wrapper .lang");
    const transInputs = document.querySelectorAll("#edit-translations-wrapper .trans");

    for (let i = 0; i < langInputs.length; i++) {
        const lang = langInputs[i].value.trim();
        const trans = transInputs[i].value.trim();
        if (lang && trans) {
            translations[lang] = trans;
        }
    }

    if (!word || Object.keys(translations).length === 0) {
        alert("Please fill out all required fields and add at least one translation.");
        return;
    }

    const updatedWord = {
        word,
        language,
        pronunciation,
        category,
        translations,
    };

    fetch(`${API_BASE}/api/words/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedWord),
    })
    .then(res => res.json())
    .then(data => {
        alert("✅ Word updated successfully!");
        closeEditModal();
        window.location.reload();
    })
    .catch(err => {
        console.error("Error updating word:", err);
        alert("❌ Failed to update word.");
    });
}

// Handle clicking the Cancel or Close button on modal
document.addEventListener("DOMContentLoaded", () => {
    // Cancel button
    const cancelBtn = document.getElementById("cancel-edit");
    if (cancelBtn) {
    cancelBtn.addEventListener("click", closeEditModal);
}

// Close (X) button
const closeBtn = document.getElementById("close-modal");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeEditModal);
    }
});


// Add one translation field by default when the page loads
window.addEventListener("DOMContentLoaded", () => {
    loadWords();
    addTranslationField();
});
