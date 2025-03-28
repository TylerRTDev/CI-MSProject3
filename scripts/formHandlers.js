export function addTranslationField() {
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
