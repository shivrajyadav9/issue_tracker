function toggleDropdown(index) {
    const dropdown = document.querySelectorAll(".dropdown-content")[index];
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}
