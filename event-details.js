window.addEventListener('DOMContentLoaded', () => {
    // If we just logged in and returned here automatically
    if (localStorage.getItem("isLoggedIn") === "true" && sessionStorage.getItem("autoOpenBooking") === "true") {
        sessionStorage.removeItem("autoOpenBooking"); // Clean up
        triggerBooking(); // Open the modal automatically
    }
});



const eventData = {
    meskel: {
        title: "Meskel Festival",
        date: "2026-09-27",
        price: 150,
        img: "image/meskel.jpg",
        desc: "Meskel commemorates the discovery of the True Cross. Join the grand bonfire (Damera) ceremony in Meskel Square, Addis Ababa."
    },
    timkat: {
        title: "Timkat (Epiphany)",
        date: "2026-01-19",
        price: 180,
        img: "image/tsegaab-bekele-qdWXzdGLw2Q-unsplash.jpg",
        desc: "The most colorful festival in Ethiopia. Watch the Tabots be carried to water for a communal baptism ceremony."
    },
    irrecha: {
        title: "Irreecha Festival",
        date: "2026-10-04",
        price: 100,
        img: "image/Oromo Abba Gada flag in _Finfinne.jpg",
        desc: "A beautiful thanksgiving festival of the Oromo people, celebrated at Bishoftu and Addis Ababa."
    },
    ashenda: {
        title: "Ashenda",
        date: "2026-08-22",
        price: 120,
        img: "image/ahenda.jpg",
        desc: "A cultural festival for young women in Northern Ethiopia, filled with drumming, dancing, and traditional grass skirts."
    }
};

// 1. Get the event name from URL
const urlParams = new URLSearchParams(window.location.search);
const eventKey = urlParams.get('event');
const currentEvent = eventData[eventKey];

// 2. Populate the page
if (currentEvent) {
    document.getElementById('event-title').textContent = currentEvent.title;
    document.getElementById('event-img').src = currentEvent.img;
    document.getElementById('event-desc').textContent = currentEvent.desc;
    document.getElementById('event-date-display').textContent = "📅 Date: " + currentEvent.date;
    document.getElementById('event-price').textContent = "$" + currentEvent.price + " per person";
}

// 3. Booking Logic
function triggerBooking() {
    // Check if user is NOT logged in
    if (localStorage.getItem("isLoggedIn") !== "true") {
        // Save where we are so we can come back
        sessionStorage.setItem("redirectAfterLogin", window.location.href);
        // Save that we want to open the booking modal immediately
        sessionStorage.setItem("autoOpenBooking", "true");
        
        alert("Please login to book this event! Redirecting... 🔐");
        
        // Send them back to index.html and add a 'login' flag to the URL
        window.location.href = "webp.html?action=login";
        return;
    }

    // If already logged in, just open the modal
    document.getElementById('bookingModal').classList.add('show');
    document.getElementById('modal-event-name').textContent = currentEvent.title;
    document.getElementById('tourDate').value = currentEvent.date;
    calculatePrice();
}

function calculatePrice() {
    const people = document.getElementById('peopleCount').value;
    const total = people * currentEvent.price;
    document.getElementById('totalPrice').textContent = "$" + total;
}

function closeBooking() {
    document.getElementById('bookingModal').classList.remove('show');
}