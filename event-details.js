Naf 2, [2/5/2026 8:01 PM]
const eventData = {
    meskel: { 
        title: "Meskel Festival", 
        date: "2026-09-27", 
        price: 150, 
        img: "image/meskel.jpg", 
        desc: `<p>Meskel commemorates the discovery of the True Cross by Queen Helena. This UNESCO-recognized heritage is famous for the 'Demera'—a massive bonfire lit in Meskel Square.</p>
               <h4 style="margin-top:15px; color:#f39c12;">What to Expect:</h4>
               <ul>
                   <li>Witness the lighting of the massive bonfire at sunset.</li>
                   <li>Watch traditional dances and choral music by the clergy.</li>
                   <li>Enjoy the seasonal 'Meskel Daisy' flowers blooming across the city.</li>
               </ul>`
    },
    timkat: { 
        title: "Timkat (Epiphany)", 
        date: "2026-01-19", 
        price: 180, 
        img: "image/tsegaab-bekele-qdWXzdGLw2Q-unsplash.jpg", 
        desc: `<p>The most colorful festival in Ethiopia, Timkat celebrates the Baptism of Christ. It is a three-day event filled with spirituality and joy.</p>
               <h4 style="margin-top:15px; color:#f39c12;">Key Highlights:</h4>
               <ul>
                   <li>The Holy Tabot procession accompanied by bells and trumpets.</li>
                   <li>The blessing of the water at historic sites like Fasilides' Bath.</li>
                   <li>Traditional 'Eskista' dancing and communal feasts.</li>
               </ul>`
    },
    irrecha: { 
        title: "Irreecha Festival", 
        date: "2026-10-04", 
        price: 100, 
        img: "image/Oromo Abba Gada flag in _Finfinne.jpg", 
        desc: `<p>A beautiful thanksgiving festival of the Oromo people. It marks the end of the rainy season and the arrival of the harvest season (Birra).</p>
               <h4 style="margin-top:15px; color:#f39c12;">Tour Experience:</h4>
               <ul>
                   <li>Visit Hora Finfinnee or Hora Harsadi for the main ceremonies.</li>
                   <li>See thousands of people dressed in vibrant traditional Oromo attire.</li>
                   <li>Experience the cultural significance of the 'Malkaa' (riverbank) prayers.</li>
               </ul>`
    },
    ashenda: { 
        title: "Ashenda", 
        date: "2026-08-22", 
        price: 120, 
        img: "image/ahenda.jpg", 
        desc: `<p>Ashenda is a unique cultural festival for young women in Northern Ethiopia. It celebrates womanhood and the end of the 15-day fast of Filseta.</p>
               <h4 style="margin-top:15px; color:#f39c12;">Highlights:</h4>
               <ul>
                   <li>Admire the unique Ashenda hairstyles and jewelry.</li>
                   <li>Hear the rhythmic clapping and singing of the 'Ashenda' songs.</li>
                   <li>Learn about the symbolic meaning of the 'Ashenda' grass skirts.</li>
               </ul>`
    }
};

const urlParams = new URLSearchParams(window.location.search);
const eventKey = urlParams.get('event');
const currentEvent = eventData[eventKey];

// Initialize Page Content
window.addEventListener('DOMContentLoaded', () => {
    if (currentEvent) {
        document.getElementById('event-title').textContent = currentEvent.title;
        document.getElementById('breadcrumb-event').textContent = currentEvent.title;
        document.getElementById('event-img').src = currentEvent.img;
        document.getElementById('event-desc').innerHTML = currentEvent.desc; // FIXED: Use innerHTML
        document.getElementById('event-date-display').textContent = "📅 " + currentEvent.date;
        document.getElementById('event-price').textContent = "$" + currentEvent.price + " per person";
    }

    // Auto-trigger booking after login redirect
    if (localStorage.getItem("isLoggedIn") === "true" && sessionStorage.getItem("autoOpenBooking") === "true") {
        sessionStorage.removeItem("autoOpenBooking");
        triggerBooking();
    }
});

Naf 2, [2/5/2026 8:01 PM]
function triggerBooking() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        sessionStorage.setItem("redirectAfterLogin", window.location.href);
        sessionStorage.setItem("autoOpenBooking", "true");
        alert("Please login to book this event! Redirecting... 🔐");
        window.location.href = "webp.html?action=login"; 
        return;
    }

    if (!currentEvent) return;

    document.getElementById('bookingModal').classList.add('show');
    document.getElementById('modal-event-name').textContent = currentEvent.title;
    document.getElementById('tourDate').value = currentEvent.date;
    calculatePrice();
}

function calculatePrice() {
    const people = document.getElementById('peopleCount').value || 1;
    const total = people * (currentEvent ? currentEvent.price : 0);
    document.getElementById('totalPrice').textContent = "$" + total;
}

function confirmBooking() {
    const people = document.getElementById('peopleCount').value;
    if (people < 1) {
        alert("Please enter at least 1 person.");
        return;
    }
    alert("Success! You have booked ${currentEvent.title} for ${people} people".);
    closeBooking();
}

function closeBooking() {
    document.getElementById('bookingModal').classList.remove('show');
}