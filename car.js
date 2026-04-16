// ===== MODEL OPHALEN =====
const params = new URLSearchParams(window.location.search);
const model = params.get('model');

const title = document.getElementById('carTitle');
const container = document.getElementById('variants');

// ===== IMAGE TITLES =====
const images = {
    "911": "https://cdn.ui.porsche.com/porsche-design-system/model-signatures/911.b68f913.svg",
    "718": "https://cdn.ui.porsche.com/porsche-design-system/model-signatures/718.493a9e3.svg",
    "Taycan": "https://cdn.ui.porsche.com/porsche-design-system/model-signatures/taycan.df444c6.svg",
    "Panamera": "https://cdn.ui.porsche.com/porsche-design-system/model-signatures/panamera.6dae809.svg",
    "Macan": "https://cdn.ui.porsche.com/porsche-design-system/model-signatures/macan.a1844f4.svg",
    "Cayenne": "https://cdn.ui.porsche.com/porsche-design-system/model-signatures/cayenne.2556201.svg",
};

// ===== TITLE ALS IMAGE =====
title.innerHTML = `<img src="${images[model]}" alt="${model}">`;

// ===== DATA =====
const data = {
    "911": [
        {
            name: "911 Carrera",
            price: 139256,
            engine: "3.0L twin-turbo flat-six",
            topSpeed: "293 km/u",
            image: "foto/911.jpg"
        },
        {
            name: "911 Turbo S",
            price: 264791,
            engine: "3.8L twin-turbo flat-six",
            topSpeed: "330 km/u",
            image: "foto/Turbo s.png"
        },
        {
            name: "911 GT3",
            price: 246871,
            engine: "4.0L atmosferische flat-six",
            topSpeed: "318 km/u",
            image: "foto/GT3.png"
        },
        {
            name: "911 GT3 RS",
            price: 364802,
            engine: "4.0L atmosferische flat-six",
            topSpeed: "325 km/u",
            image: "foto/gt3rs.png"
        }
    ],

    "718": [
        {
            name: "718 Cayman GT4 RS",
            price: 264984,
            engine: "6-cilinder atmosferische",
            topSpeed: "315 km/u",
            image: "foto/gt4 rs.png"
        },
        {
            name: "718 Spyder RS",
            price: 259012,
            engine: "4.0L atmosferische flat-six",
            topSpeed: "308 km/u",
            image: "foto/Spyder rs.png"
        }
    ],

    "Taycan": [
        {
            name: "Taycan",
            price: 100000,
            engine: "Elektrisch",
            topSpeed: "230 km/u",
            image: "foto/taycan.png"
        },
        {
            name: "Taycan 4S",
            price: 118000,
            engine: "Elektrisch",
            topSpeed: "250 km/u",
            image: "foto/taycan 4s.png"
        },
        {
            name: "Taycan Gts",
            price: 180000,
            engine: "Elektrisch",
            topSpeed: "260 km/u",
            image: "foto/taycan gts.png"
        },
        {
            name: "Taycan Turbo S",
            price: 210000,
            engine: "Elektrisch",
            topSpeed: "260 km/u",
            image: "foto/taycan tubro s.png"
        }
    ],

    "Panamera": [
        {
            name: "Panamera",
            price: 120000,
            engine: "2.9L V6 turbo",
            topSpeed: "270 km/u",
            image: "foto/panamera.png"
        },
        {
            name: "Panamera GTS",
            price: 128000,
            engine: "2.9L V6 turbo",
            topSpeed: "272 km/u",
            image: "foto/Panamera GTS.png"
        },
        {
            name: "Panamera 4 E-Hybrid",
            price: 140000,
            engine: "V6 hybrid",
            topSpeed: "280 km/u",
            image: "foto/Panamera 4 E-Hybrid.png"
        },
        {
            name: "Panamera Turbo S E-Hybrid Executive",
            price: 200000,
            engine: "V8 hybrid",
            topSpeed: "315 km/u",
            image: "foto/Panamera Turbo S E-Hybrid Executive.png"
        }
    ],

    "Macan": [
        {
            name: "Macan",
            price: 80000,
            engine: "2.0L turbo",
            topSpeed: "232 km/u",
            image: "foto/Macan.png"
        },
        {
            name: "Macan GTS",
            price: 87000,
            engine: "2.0L turbo",
            topSpeed: "232 km/u",
            image: "foto/Macan GTS.png"
        },
        {
            name: "Macan 4 Electric",
            price: 95000,
            engine: "Elektrisch",
            topSpeed: "220 km/u",
            image: "foto/Macan 4.png"
        },
        {
            name: "Macan Turbo ",
            price: 118000,
            engine: "Elektrisch",
            topSpeed: "260 km/u",
            image: "foto/Macan Turbo.png"
        }
    ],

    "Cayenne": [
        {
            name: "Cayenne",
            price: 110000,
            engine: "3.0L V6 turbo",
            topSpeed: "248 km/u",
            image: "foto/Cayenne.png"
        },
        {
            name: "Cayenne Coupé",
            price: 132000,
            engine: "4.0L V8 biturbo",
            topSpeed: "273 km/u",
            image: "foto/Coupé.png"
        },
        {
            name: "Cayenne S E-Hybrid Coupé Black Edition",
            price: 125000,
            engine: "V6 hybrid",
            topSpeed: "254 km/u",
            image: "foto/Cayenne S E-Hybrid Coupé Black Edition.png"
        },
        {
            name: "Cayenne Turbo GT",
            price: 170000,
            engine: "4.0L V8 biturbo",
            topSpeed: "305 km/u",
            image: "foto/Cayenne Turbo E-Hybrid Coupé with GT Package.png"
        }
    ]
};

// ===== VARIANTS RENDER =====
const cars = data[model];

if (!cars) {
    container.innerHTML = "<p>Model niet gevonden.</p>";
} else {
    cars.forEach(car => {
        const div = document.createElement('div');
        div.classList.add('variant');

        div.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="variant-img">
            <h2>${car.name}</h2>
            <p><strong>Motor:</strong> ${car.engine}</p>
            <p><strong>Topsnelheid:</strong> ${car.topSpeed}</p>
            <p><strong>Prijs:</strong> € ${car.price.toLocaleString('nl-NL')}</p>
            <button onclick="addToCart('${car.name}', ${car.price})">
                Voeg toe
            </button>
        `;

        container.appendChild(div);
    });
}

// ===== CART =====
function addToCart(productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let index = cart.findIndex(item => item.name === productName);

    if (index >= 0) {
        cart[index].amount += 1;
    } else {
        cart.push({
            name: productName,
            amount: 1,
            price: price
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}