import { loadWords } from './loadWords.js';
import { addTranslationField } from './formHandlers.js';

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

// Handle clicking "Edit" button
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-btn")) {
        const card = e.target.closest(".word-card");

        // Get word details from card
        const word = card.querySelector("h3").textContent;
        const pronunciation = card.querySelectorAll(".translations")[1].textContent.replace("Pronunciation: ", "");
        const translationText = card.querySelectorAll(".translations")[0].textContent;

        // Reset form before populating
        document.getElementById("add-word-form").reset();
        document.getElementById("translations-wrapper").innerHTML = "";

        // Load data into form
        document.getElementById("word").value = word;
        document.getElementById("pronunciation").value = pronunciation;

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
            <button type="button" class="remove-btn">✖</button>
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

// Add one translation field by default when the page loads
window.addEventListener("DOMContentLoaded", () => {
    loadWords();
    addTranslationField();
});
