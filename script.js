const cards = document.querySelectorAll('.card');
const searchInput = document.getElementById('searchInput');

// ================= VIDEO HOVER =================
cards.forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;

  video.muted = true;
  video.loop = true;

  card.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.play().catch(() => { });
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

// ================= FILTER (ALLEEN UI) =================
function filterProducten(categorie) {
  const gekozenCategorie = categorie.toLowerCase();

  cards.forEach(card => {
    const categorieen = card.dataset.categorie
      .toLowerCase()
      .split(',')
      .map(item => item.trim());

    if (gekozenCategorie === 'alles' || categorieen.includes(gekozenCategorie)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ================= SEARCH =================
searchInput.addEventListener('input', () => {
  const zoekterm = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const naam = card.querySelector('h2 img').alt.toLowerCase();
    const beschrijving = card.querySelector('p').textContent.toLowerCase();

    if (naam.includes(zoekterm) || beschrijving.includes(zoekterm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// ================= SHOPPING CART =================
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

function goToCar(model) {
  window.location.href = `car.html?model=${model}`;
}