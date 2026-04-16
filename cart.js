const cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItems = document.getElementById('cartItems');
const cartStatus = document.getElementById('cartStatus');
const summaryItems = document.getElementById('summaryItems');
const summarySubtotal = document.getElementById('summarySubtotal');
const summaryDelivery = document.getElementById('summaryDelivery');
const summaryTotal = document.getElementById('summaryTotal');
const clearCartButton = document.getElementById('clearCartButton');

function saveCart(updatedCart) {
  localStorage.setItem('cart', JSON.stringify(updatedCart));
}

function formatPrice(price) {
  return price.toLocaleString('nl-NL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function fillCartList() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartStatus.textContent = 'Je winkelwagen is leeg.';
    summaryItems.textContent = '0';
    summarySubtotal.textContent = 'EUR 0,00';
    summaryDelivery.textContent = 'Free';
    summaryTotal.textContent = 'EUR 0,00';
    clearCartButton.style.display = 'none';
    return;
  }

  cartStatus.textContent = `${cart.length} auto${cart.length > 1 ? "'s" : ''} in je winkelwagen`;
  clearCartButton.style.display = 'inline-block';

  let totaal = 0;
  let aantalItems = 0;

  cart.forEach((element, index) => {
    const itemTotal = element.price * element.amount;
    totaal += itemTotal;
    aantalItems += element.amount;

    const item = document.createElement('div');
    item.classList.add('cart-item');

    item.innerHTML = `
      <div class="cart-item-info">
        <h3>${element.name}</h3>
        <p>Aantal: ${element.amount}</p>
        <p>Prijs per stuk: € ${formatPrice(element.price)}</p>
        <p>Totaal: € ${formatPrice(itemTotal)}</p>
      </div>
      <div class="cart-item-actions">
        <button class="remove-item-btn" data-index="${index}">Verwijder</button>
      </div>
    `;

    cartItems.appendChild(item);
  });

  summaryItems.textContent = aantalItems;
  summarySubtotal.textContent = `EUR ${formatPrice(totaal)}`;
  summaryDelivery.textContent = 'Free';
  summaryTotal.textContent = `EUR ${formatPrice(totaal)}`;

  const removeButtons = document.querySelectorAll('.remove-item-btn');

  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      cart.splice(index, 1);
      saveCart(cart);
      fillCartList();
    });
  });
}

clearCartButton.addEventListener('click', () => {
  localStorage.removeItem('cart');
  cart.length = 0;
  fillCartList();
});

fillCartList();