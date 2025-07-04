// Theme toggle for dark / light mode specific to biography page (and reusable elsewhere)
// Requires a button with id="theme-toggle" and icon element with id="theme-icon" inside it.

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  if (!toggleBtn || !icon) return;

  const applyTheme = (mode) => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      document.documentElement.classList.remove("dark");
      icon.classList.add("fa-moon");
      icon.classList.remove("fa-sun");
    }
  };

  // Get stored preference or system preference
  let saved = localStorage.getItem("theme");
  if (!saved) {
    saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  applyTheme(saved);

  toggleBtn.addEventListener("click", () => {
    const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
});
