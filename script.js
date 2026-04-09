const cards = document.querySelectorAll('.card');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filters button');

let actieveCategorie = 'alles';

// video hover
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

// alles samen filteren
function updateProducten() {
  const zoekterm = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const categorieen = card.dataset.categorie
      .toLowerCase()
      .split(',')
      .map(item => item.trim());

    const naam = card.querySelector('h2 img').alt.toLowerCase();
    const beschrijving = card.querySelector('p').textContent.toLowerCase();

    const matchCategorie =
      actieveCategorie === 'alles' || categorieen.includes(actieveCategorie);

    const matchZoekterm =
      naam.includes(zoekterm) || beschrijving.includes(zoekterm);

    if (matchCategorie && matchZoekterm) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// filter functie
function filterProducten(categorie) {
  actieveCategorie = categorie.toLowerCase();

  filterButtons.forEach(button => {
    button.classList.remove('active');

    if (button.textContent.toLowerCase() === actieveCategorie) {
      button.classList.add('active');
    }

    if (actieveCategorie === 'alles' && button.textContent.toLowerCase() === 'alles') {
      button.classList.add('active');
    }
  });

  updateProducten();
}

// zoekfunctie
searchInput.addEventListener('input', () => {
  updateProducten();
});