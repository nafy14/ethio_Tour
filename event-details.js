window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("isLoggedIn") === "true" && sessionStorage.getItem("autoOpenBooking") === "true") {
        sessionStorage.removeItem("autoOpenBooking");
        triggerBooking();
    }
});

const eventData = {
    meskel: { title: "Meskel Festival", date: "2026-09-27", price: 150, img: "image/meskel.jpg", desc: "Meskel commemorates the discovery of the True Cross..." },
    timkat: { title: "Timkat (Epiphany)", date: "2026-01-19", price: 180, img: "image/tsegaab-bekele-qdWXzdGLw2Q-unsplash.jpg", desc: "The most colorful festival in Ethiopia..." },
    irrecha: { title: "Irreecha Festival", date: "2026-10-04", price: 100, img: "image/Oromo Abba Gada flag in _Finfinne.jpg", desc: "A beautiful thanksgiving festival..." },
    ashenda: { title: "Ashenda", date: "2026-08-22", price: 120, img: "image/ahenda.jpg", desc: "A cultural festival for young women..." }
};

const urlParams = new URLSearchParams(window.location.search);
const eventKey = urlParams.get('event');
const currentEvent = eventData[eventKey];

if (currentEvent) {
    document.getElementById('event-title').textContent = currentEvent.title;
    document.getElementById('event-img').src = currentEvent.img;
    document.getElementById('event-desc').textContent = currentEvent.desc;
    document.getElementById('event-date-display').textContent = "📅 Date: " + currentEvent.date;
    document.getElementById('event-price').textContent = "$" + currentEvent.price + " per person";
}

function triggerBooking() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        sessionStorage.setItem("redirectAfterLogin", window.location.href);
        sessionStorage.setItem("autoOpenBooking", "true");
        alert("Please login to book this event! Redirecting... 🔐");
        // FIX THIS FILENAME TO MATCH YOUR MAIN PAGE
        window.location.href = "webp.html?action=login"; 
        return;
    }

    document.getElementById('bookingModal').classList.add('show');
    document.getElementById('modal-event-name').textContent = currentEvent.title;
    document.getElementById('tourDate').value = currentEvent.date;
    calculatePrice();
}

function calculatePrice() {
    const people = document.getElementById('peopleCount').value || 1;
    // Added 0 as fallback to prevent NaN errors
    const total = (people * (currentEvent ? currentEvent.price : 0));
    document.getElementById('totalPrice').textContent = "$" + total;
}

// NEW: Missing Confirm Function
function confirmBooking() {
    const people = document.getElementById('peopleCount').value;
    if (people < 1) {
        alert("Please enter at least 1 person.");
        return;
    }
    alert(`Success! You have booked ${currentEvent.title} for ${people} people on ${currentEvent.date}.`);
    closeBooking();
}

function closeBooking() {
    document.getElementById('bookingModal').classList.remove('show');
}