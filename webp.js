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