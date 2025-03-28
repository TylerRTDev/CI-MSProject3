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