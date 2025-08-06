// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".nav-mobile")
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
  const cookieModal = document.getElementById("cookie-modal")
  const cookiePreferencesBtn = document.getElementById("cookie-preferences")
  const cookieModalClose = document.getElementById("cookie-modal-close")
  const declineAllBtn = document.getElementById("decline-all")
  const acceptAllBtn = document.getElementById("accept-all")
  const savePreferencesBtn = document.getElementById("save-preferences")

  // Mobile menu toggle
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true"
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded)
      mobileMenuBtn.classList.toggle("active")
      mobileNav.classList.toggle("active")
    })
  }

  // Dropdown functionality
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault()
      const dropdown = this.closest(".dropdown")
      const isActive = dropdown.classList.contains("active")

      // Close all dropdowns
      document.querySelectorAll(".dropdown").forEach((d) => {
        d.classList.remove("active")
        d.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false")
      })

      // Toggle current dropdown
      if (!isActive) {
        dropdown.classList.add("active")
        this.setAttribute("aria-expanded", "true")
      }
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active")
        dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false")
      })
    }
  })

  // Cookie preferences functionality
  if (cookiePreferencesBtn && cookieModal) {
    cookiePreferencesBtn.addEventListener("click", () => {
      cookieModal.style.display = "flex"
    })
  }

  if (cookieModalClose) {
    cookieModalClose.addEventListener("click", () => {
      cookieModal.style.display = "none"
    })
  }

  if (declineAllBtn) {
    declineAllBtn.addEventListener("click", () => {
      localStorage.setItem("analytics-cookies", "false")
      localStorage.setItem("marketing-cookies", "false")
      cookieModal.style.display = "none"
    })
  }

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener("click", () => {
      localStorage.setItem("analytics-cookies", "true")
      localStorage.setItem("marketing-cookies", "true")
      cookieModal.style.display = "none"
    })
  }

  if (savePreferencesBtn) {
    savePreferencesBtn.addEventListener("click", () => {
      const analyticsCheckbox = document.getElementById("analytics-cookies")
      const marketingCheckbox = document.getElementById("marketing-cookies")

      localStorage.setItem("analytics-cookies", analyticsCheckbox.checked)
      localStorage.setItem("marketing-cookies", marketingCheckbox.checked)
      cookieModal.style.display = "none"
    })
  }

  // Load saved cookie preferences
  const analyticsCheckbox = document.getElementById("analytics-cookies")
  const marketingCheckbox = document.getElementById("marketing-cookies")

  if (analyticsCheckbox) {
    const analyticsSetting = localStorage.getItem("analytics-cookies")
    if (analyticsSetting !== null) {
      analyticsCheckbox.checked = analyticsSetting === "true"
    }
  }

  if (marketingCheckbox) {
    const marketingSetting = localStorage.getItem("marketing-cookies")
    if (marketingSetting !== null) {
      marketingCheckbox.checked = marketingSetting === "true"
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
        header.style.backdropFilter = "blur(10px)"
      } else {
        header.style.backgroundColor = "white"
        header.style.backdropFilter = "none"
      }
    })
  }
})
