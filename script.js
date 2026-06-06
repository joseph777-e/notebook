function toggleDarkMode() {
  const bodyClassList = document.body.classList;
  const isDarkMode = bodyClassList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  updateToggleIcon();
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.toggle("show");
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  // Prevent body from scrolling when sidebar is open
  document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "auto";
}


function updateToggleIcon() {
  const isDark = document.body.classList.contains("dark-mode");
  const toggleIcon = document.getElementById("toggleIcon");
  if (toggleIcon) {
    toggleIcon.textContent = isDark ? "Dark mode 🌚" : "Light mode 🌞";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Set theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateToggleIcon();

  // Close sidebar if user clicks anywhere outside (on overlay)
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.addEventListener("click", toggleSidebar);
  }

  // Auto-close sidebar when clicking a link inside it
  document.querySelectorAll("#sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar");
      const overlay = document.getElementById("overlay");
      if (sidebar && overlay) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto"; // Restore scroll
      }
    });
  });

  // Attach dark mode toggle functionality
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode);
  }
});

// Close sidebar if user clicks outside of it
document.addEventListener("click", (event) => {
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.querySelector(".menu-icon, .menu-btn"); // both types
  const overlay = document.getElementById("overlay");

  // If sidebar is active and click is outside sidebar and toggle button
  const clickedOutsideSidebar = !sidebar.contains(event.target) && !menuIcon.contains(event.target);

  if (sidebar.classList.contains("active") && clickedOutsideSidebar) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto"; // restore scroll
  }

  // Dropdown menu auto-close
  const menu = document.getElementById("menu");
  const isInsideMenu = menu && menu.contains(event.target);
  if (menu && !isInsideMenu && !menuIcon.contains(event.target)) {
    menu.classList.remove("show");
  }
});

 
signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    window.location.href = "index.html"; // Go to main site
  })
  .catch((error) => alert("Login error: " + error.message));


