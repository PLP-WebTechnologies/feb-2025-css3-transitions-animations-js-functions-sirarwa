// User preferences manager
const PreferencesManager = {
    // Save preferences to localStorage
    savePreferences: (preferences) => {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))
    },
  
    // Get preferences from localStorage
    getPreferences: () => {
      const savedPrefs = localStorage.getItem("userPreferences")
      return savedPrefs
        ? JSON.parse(savedPrefs)
        : {
            darkMode: false,
            animationSpeed: "medium",
          }
    },
  
    // Apply saved preferences
    applyPreferences: function () {
      const preferences = this.getPreferences()
  
      // Apply dark mode
      if (preferences.darkMode) {
        document.body.classList.add("dark-theme")
        document.getElementById("theme-switch").checked = true
      } else {
        document.body.classList.remove("dark-theme")
        document.getElementById("theme-switch").checked = false
      }
  
      // Apply animation speed
      document.body.classList.remove("slow-animation", "medium-animation", "fast-animation")
      document.body.classList.add(`${preferences.animationSpeed}-animation`)
      document.getElementById("animation-speed").value = preferences.animationSpeed
    },
  }
  
  // Animation controller
  const AnimationController = {
    animations: ["pulse", "rotate", "fade", "bounce"],
  
    // Apply random animation to an element
    applyRandomAnimation: function (element) {
      // Remove any existing animations
      this.animations.forEach((animation) => {
        element.classList.remove(animation)
      })
  
      // Get a random animation
      const randomAnimation = this.animations[Math.floor(Math.random() * this.animations.length)]
  
      // Apply the animation
      element.classList.add(randomAnimation)
  
      // Remove the animation class after it completes
      setTimeout(
        () => {
          element.classList.remove(randomAnimation)
        },
        Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--animation-duration")) * 1000,
      )
    },
  
    // Toggle active state for image container
    toggleActive: (container) => {
      container.classList.toggle("active")
    },
  }
  
  // Initialize the application
  document.addEventListener("DOMContentLoaded", () => {
    // Apply saved preferences
    PreferencesManager.applyPreferences()
  
    // Theme toggle functionality
    const themeSwitch = document.getElementById("theme-switch")
    themeSwitch.addEventListener("change", function () {
      const preferences = PreferencesManager.getPreferences()
      preferences.darkMode = this.checked
  
      if (this.checked) {
        document.body.classList.add("dark-theme")
      } else {
        document.body.classList.remove("dark-theme")
      }
  
      PreferencesManager.savePreferences(preferences)
    })
  
    // Animation speed functionality
    const speedSelector = document.getElementById("animation-speed")
    speedSelector.addEventListener("change", function () {
      const preferences = PreferencesManager.getPreferences()
      preferences.animationSpeed = this.value
  
      document.body.classList.remove("slow-animation", "medium-animation", "fast-animation")
      document.body.classList.add(`${this.value}-animation`)
  
      PreferencesManager.savePreferences(preferences)
    })
  
    // Image container click functionality
    const imageContainers = document.querySelectorAll(".image-container")
    imageContainers.forEach((container) => {
      container.addEventListener("click", function () {
        AnimationController.toggleActive(this)
      })
    })
  
    // Animate all button functionality
    const animateAllButton = document.getElementById("animate-all")
    animateAllButton.addEventListener("click", () => {
      const images = document.querySelectorAll(".gallery-image")
      images.forEach((image) => {
        AnimationController.applyRandomAnimation(image)
      })
    })
  })
  