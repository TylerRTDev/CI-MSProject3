export function openEditModal() {
    document.getElementById("edit-modal").style.display = "block";
}

export function closeEditModal() {
document.getElementById("edit-modal").style.display = "none";
document.getElementById("edit-word-form").reset();
document.getElementById("edit-translations-wrapper").innerHTML = "";
document.getElementById("edit-word-id").value = "";
}

document.getElementById("close-modal").addEventListener("click", closeEditModal);
document.getElementById("cancel-edit").addEventListener("click", closeEditModal);

window.addEventListener("click", function (e) {
    if (e.target.id === "edit-modal") {
        closeEditModal();
    }
});
