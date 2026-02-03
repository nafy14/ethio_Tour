const destinationPrices = {
  "Afar Depression": 300,
  "Lalibela": 200,
  "Fassil": 200,
  "Simien Mountains": 300,
  "Axum": 200,
  "Bale Mountains": 300
};

let selectedDestination = "";

let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


const typedText = document.getElementById("typed-text");
const words = ["Adventure", "Culture", "History", "Beauty"];
let i = 0, j = 0, currentWord = "", isDeleting = false;

function type() {
  if (i >= words.length) i = 0;
  const fullWord = words[i];

  if (!isDeleting) {
    currentWord = fullWord.substring(0, j + 1);
    j++;
  } else {
    currentWord = fullWord.substring(0, j - 1);
    j--;
  }


  typedText.textContent = currentWord;

  if (!isDeleting && j === fullWord.length) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i++;
  }

  setTimeout(type, isDeleting ? 100 : 200);
}

type();





function showMore() {
  const more = document.getElementById("more");
  const btn = document.querySelector(".ds-btns"); // Added 's' to match HTML
  more.classList.toggle("show");
  
  if (btn) {
    btn.textContent = more.classList.contains("show") ? "Show Less" : "Show More";
  }
}

// Swiper
new Swiper(".mySwiper", {
  slidesPerView: 1,
  breakpoints: {
    640: { slidesPerView: 1.2 },
    1024: { slidesPerView: 2.5 }
  },
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


function showError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
  error.style.display = "block";
  input.classList.add("invalid");
  input.classList.remove("valid");
}

function showSuccess(input) {
  const error = input.nextElementSibling;
  error.style.display = "none";
  input.classList.remove("invalid");
  input.classList.add("valid");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



const authModal = document.getElementById("authModal");

function openLogin() {
  authModal.classList.add("show");
  switchForm("login");
}

function openRegister() {
  authModal.classList.add("show");
  switchForm("register");
}

function closeAuth() {
  authModal.classList.remove("show");
}

function switchForm(type) {
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("registerForm").classList.remove("active");

  if (type === "login") {
    document.getElementById("loginForm").classList.add("active");
  } else {
    document.getElementById("registerForm").classList.add("active");
  }
}

/* close modal on background click */
authModal.addEventListener("click", e => {
  if (e.target === authModal) closeAuth();
});

function validateLogin() {
  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");

  let valid = true;

  if (!email.value || !isValidEmail(email.value)) {
    showError(email, "Enter a valid email");
    valid = false;
  } else {
    showSuccess(email);
  }

  if (!password.value || password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    valid = false;
  } else {
    showSuccess(password);
  }

if (valid) {
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful 🎉");
    closeAuth();

    // NEW: Check if we need to send the user back to the event page
    const returnUrl = sessionStorage.getItem("redirectAfterLogin");
    if (returnUrl) {
        sessionStorage.removeItem("redirectAfterLogin"); // Clear it so it doesn't loop
        window.location.href = returnUrl; 
    }
  }
}


function validateRegister() {
  const name = document.getElementById("regName");
  const email = document.getElementById("regEmail");
  const password = document.getElementById("regPassword");

  let valid = true;

  if (!name.value.trim()) {
    showError(name, "Name is required");
    valid = false;
  } else {
    showSuccess(name);
  }

  if (!email.value || !isValidEmail(email.value)) {
    showError(email, "Enter a valid email");
    valid = false;
  } else {
    showSuccess(email);
  }

  if (!password.value || password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    valid = false;
  } else {
    showSuccess(password);
  }

if (valid) {
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", "true");

  alert("Account created successfully 🎊");
  closeAuth();
}
}

const bookingModal = document.getElementById("bookingModal");

function openBooking(destination) {
  if (!isLoggedIn) {
    alert("Please login or register to book a tour 🔐");
    openLogin();
    return;
  }

  selectedDestination = destination;
  bookingModal.classList.add("show");
  calculatePrice();
}


const tourDateInput = document.getElementById("tourDate");

if (tourDateInput) {
  const today = new Date().toISOString().split("T")[0];
  tourDateInput.setAttribute("min", today);
}



function calculatePrice() {
  const people = Number(document.getElementById("peopleCount").value || 0);
  const language = document.getElementById("guideLanguage").value;
  const priceText = document.getElementById("totalPrice");

  if (!selectedDestination || people === 0) {
    priceText.textContent = "$0";
    return;
  }

  let basePrice = destinationPrices[selectedDestination];
  let languageExtra = 0;

  switch (language) {
    case "french":
    case "arabic":
      languageExtra = 10;
      break;
    case "italian":
    case "german":
      languageExtra = 15;
      break;
  }

  const total = people * (basePrice + languageExtra);
  priceText.textContent = `$${total}`;
}


function confirmBooking() {
  const date = document.getElementById("tourDate");
  const people = document.getElementById("peopleCount");
  const language = document.getElementById("guideLanguage");

  let valid = true;

  if (!date.value) {
    showError(date, "Select a date");
    valid = false;
  } else showSuccess(date);

  if (!people.value || people.value < 1) {
    showError(people, "Enter number of people");
    valid = false;
  } else showSuccess(people);

  if (!language.value) {
    showError(language, "Select a guide language");
    valid = false;
  } else showSuccess(language);

  if (valid) {
    alert(`Booking confirmed for ${selectedDestination} 🧭`);
    closeBooking();
  }
}
function closeBooking() {
  bookingModal.classList.remove("show");
}




/* Close booking modal when clicking outside */
bookingModal.addEventListener("click", e => {
  if (e.target === bookingModal) closeBooking();
});




const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
// Optional: Ensure icon reference is safe
const icon = toggleButton && toggleButton.querySelector("i");

if (toggleButton && icon) {
  // Check Saved Theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  toggleButton.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";

    if (isDark) {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  });
}


function openDestination(data) {
  const modal = document.getElementById("destinationModal");
  document.getElementById("destImage").src = data.image;
  document.getElementById("destTitle").textContent = data.title;
  document.getElementById("destDescription").textContent = data.description;
  document.getElementById("destPrice").textContent = data.price;
  document.getElementById("destRating").textContent = data.rating;
  
  // Store title so the booking button inside this modal knows which place it is
  selectedDestination = data.title; 
  modal.classList.add("show");
}

function closeDestination() {
  document.getElementById("destinationModal").classList.remove("show");
}

// Add this for the button inside the Destination Detail modal
function openBookingFromDetails() {
  closeDestination();
  openBooking(selectedDestination);
}




/* --- Mobile Navigation Toggle --- */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-item");

// Toggle menu on click
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  // Change icon to 'X' when active
  const icon = hamburger.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const icon = hamburger.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});


// Check for login redirect or auto-booking intent on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // 1. If we came from the event page specifically to login
    if (urlParams.get('action') === 'login' && !isLoggedIn) {
        openLogin();
    }

    // 2. If the user JUST logged in and we have a saved redirect
    if (isLoggedIn && sessionStorage.getItem("redirectAfterLogin")) {
        const returnUrl = sessionStorage.getItem("redirectAfterLogin");
        sessionStorage.removeItem("redirectAfterLogin"); // Clear it so it doesn't loop
        window.location.href = returnUrl;
    }
});