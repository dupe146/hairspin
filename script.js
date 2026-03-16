const hairstyles = [
    {
        id: 1,
        name: "Passion Twists",
        category: "Braids",
        attachment: "Passion hair extension",
        hours: 5,
        price: 15000,
        packs: 4,
        length: "medium",
        difficulty: "Medium",
        rating: 4.8,
        maintenance: "Re-dip ends in hot water every 2 weeks to keep them fresh",
        videoUrl: "https://www.youtube.com/watch?v=example1"
    },
    {
        id: 2,
        name: "Ghana Weaving",
        category: "Braids",
        attachment: "Attachment thread",
        hours: 3,
        price: 9000,
        packs: 2,
        length: "short",
        difficulty: "Easy",
        rating: 4.6,
        maintenance: "Oil scalp every 3 days. Lasts 4-6 weeks",
        videoUrl: "https://www.youtube.com/watch?v=example2"
    },
    {
        id: 3,
        name: "Knotless Braids",
        category: "Braids",
        attachment: "X-pression braiding hair",
        hours: 7,
        price: 20000,
        packs: 5,
        length: "long",
        difficulty: "Hard",
        rating: 4.9,
        maintenance: "Mousse the braids weekly. Lasts 6-8 weeks with proper care",
        videoUrl: "https://www.youtube.com/watch?v=example3"
    },
    {
        id: 4,
        name: "French Curls",
        category: "Curls",
        attachment: "French curl hair",
        hours: 4,
        price: 12000,
        packs: 3,
        length: "medium",
        difficulty: "Medium",
        rating: 4.5,
        maintenance: "Avoid water — curls loosen when wet. Lasts 2-3 weeks",
        videoUrl: "https://www.youtube.com/watch?v=example4"
    },
    {
        id: 5,
        name: "Cornrows",
        category: "Natural",
        attachment: "None",
        hours: 2,
        price: 6000,
        packs: 0,
        length: "short",
        difficulty: "Easy",
        rating: 4.4,
        maintenance: "Moisturise scalp daily. Lasts 2-4 weeks",
        videoUrl: "https://www.youtube.com/watch?v=example5"
    },
    {
        id: 6,
        name: "Bantu Knots",
        category: "Natural",
        attachment: "None",
        hours: 2,
        price: 5000,
        packs: 0,
        length: "short",
        difficulty: "Easy",
        rating: 4.3,
        maintenance: "Keep moisturised. Lasts 1-2 weeks",
        videoUrl: "https://www.youtube.com/watch?v=example6"
    },
    {
        id: 7,
        name: "Box Braids",
        category: "Braids",
        attachment: "X-pression braiding hair",
        hours: 6,
        price: 18000,
        packs: 5,
        length: "long",
        difficulty: "Medium",
        rating: 4.7,
        maintenance: "Spray with braid spray weekly. Lasts 6-8 weeks",
        videoUrl: "https://www.youtube.com/watch?v=example7"
    },
    {
        id: 8,
        name: "Butterfly Locs",
        category: "Locs",
        attachment: "Distressed faux loc hair",
        hours: 8,
        price: 25000,
        packs: 6,
        length: "long",
        difficulty: "Hard",
        rating: 4.9,
        maintenance: "Mousse weekly. Avoid excessive moisture. Lasts 6-8 weeks",
        videoUrl: "https://www.youtube.com/watch?v=example8"
    },
];

let favourites = JSON.parse(localStorage.getItem("hairspinFavourites")) || [];

const saveFavourite = (hairstyleId) => {

    const hairstyle = hairstyles.find(h => h.id === hairstyleId);
    
    const alreadySaved = favourites.find(h => h.id === hairstyleId);
    
    if (alreadySaved) {
    
        favourites = favourites.filter(h => h.id !== hairstyleId);
        showToast(`${hairstyle.name} removed from favourites`);
    } else {

        favourites.push(hairstyle);
        showToast(`${hairstyle.name} saved to favourites 🤎`);
    }
    
    localStorage.setItem("hairspinFavourites", JSON.stringify(favourites));
    

    const currentFilter = document.querySelector(".pill.active").dataset.filter;
    if (currentFilter === "saved") {
        displayHairstyles(favourites);
    } else {
        displayHairstyles(hairstyles);
    }
};

const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add("visible"), 10);
    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
};
//   GRAB ELEMENTS FROM THE PAGE

const spinBtn = document.getElementById("spinBtn");
const resultSection = document.getElementById("resultSection");
const hairstyleGrid = document.getElementById("hairstyleGrid");
const searchInput = document.getElementById("searchInput");
const filterPills = document.querySelectorAll(".pill");

// Result card elements
const cardName = document.getElementById("cardName");
const cardCategory = document.getElementById("cardCategory");
const cardLength = document.getElementById("cardLength");
const cardAttachment = document.getElementById("cardAttachment");
const cardHours = document.getElementById("cardHours");
const cardPacks = document.getElementById("cardPacks");
const cardRating = document.getElementById("cardRating");
const cardPrice = document.getElementById("cardPrice");


//   SPIN FUNCTION
const getRandomHairstyle = () => {
    const randomIndex = Math.floor(Math.random() * hairstyles.length);
    return hairstyles[randomIndex];
};

const displaySpinResult = (hairstyle) => {
    cardName.textContent = hairstyle.name;
    cardCategory.textContent = hairstyle.category;
    cardLength.textContent = hairstyle.length + " length";
    cardAttachment.textContent = "Attachment: " + hairstyle.attachment;
    cardHours.textContent = hairstyle.hours + " hrs";
    cardPacks.textContent = hairstyle.packs === 0 ? "None" : hairstyle.packs + " packs";
    cardRating.textContent = "★ " + hairstyle.rating;
    cardPrice.textContent = "₦" + hairstyle.price.toLocaleString();

    resultSection.classList.add("visible");
    resultSection.scrollIntoView({ behavior: "smooth" });
};

spinBtn.addEventListener("click", () => {
    const picked = getRandomHairstyle();
    displaySpinResult(picked);
});


//   DISPLAY ALL HAIRSTYLES
const createHairstyleCard = (hairstyle) => {
    const isSaved = favourites.find(h => h.id === hairstyle.id);
    
    return `
        <div class="card grid-card">
            <div class="card-image">
                <img 
                    src="https://placehold.co/400x260/F0E8E0/6B3A20?text=${hairstyle.name.replace(/ /g, '+')}" 
                    alt="${hairstyle.name}"
                    class="hairstyle-img"
                />
            </div>
            <div class="card-body">
                <div class="badge-row">
                    <span class="badge badge-brown">${hairstyle.category}</span>
                    <span class="badge badge-pink">${hairstyle.length} length</span>
                </div>
                <h3 class="card-title">${hairstyle.name}</h3>
                <p class="card-sub">Attachment: ${hairstyle.attachment}</p>
                <div class="stats">
                    <div class="stat">
                        <span class="stat-val">${hairstyle.hours} hrs</span>
                        <span class="stat-lbl">Duration</span>
                    </div>
                    <div class="stat">
                        <span class="stat-val">${hairstyle.packs === 0 ? "None" : hairstyle.packs + " packs"}</span>
                        <span class="stat-lbl">Extensions</span>
                    </div>
                    <div class="stat">
                        <span class="stat-val">★ ${hairstyle.rating}</span>
                        <span class="stat-lbl">Rating</span>
                    </div>
                </div>
                <div class="maintenance-tip">
                    💡 ${hairstyle.maintenance}
                </div>
                <div class="price-row">
                    <span class="price">₦${hairstyle.price.toLocaleString()}</span>
                    <button 
                        class="save-btn ${isSaved ? 'saved' : ''}" 
                        onclick="saveFavourite(${hairstyle.id})"
                    >
                        ${isSaved ? 'Saved ♥' : 'Save ♡'}
                    </button>
                </div>
            </div>
        </div>
    `;
};
const displayHairstyles = (list) => {
    hairstyleGrid.innerHTML = list.map(createHairstyleCard).join("");
};

// Show all hairstyles when page loads
displayHairstyles(hairstyles);



searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = hairstyles.filter(h =>
        h.name.toLowerCase().includes(query)
    );
    displayHairstyles(filtered);
});


//   FILTER PILLS

filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");

        const filter = pill.dataset.filter;
        let filtered = [];

        if (filter === "all") {
            filtered = hairstyles;
        } else if (filter === "easy") {
            filtered = hairstyles.filter(h => h.difficulty === "Easy");
        } else if (filter === "budget") {
            filtered = hairstyles.filter(h => h.price <= 10000);
        } else if (filter === "quick") {
            filtered = hairstyles.filter(h => h.hours <= 3);
        } else if (filter === "shoulder") {
            filtered = hairstyles.filter(h => h.length === "medium");
        }else if (filter === "saved") {
    filtered = favourites;
}

        displayHairstyles(filtered);
    });
});

