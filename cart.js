const cart = JSON.parse(localStorage.getItem('cart')) || [];
const list = document.getElementById('products');
const totalPriceElement = document.getElementById('totalPrice');
const emptyMessage = document.getElementById('emptyMessage');
const clearCartBtn = document.getElementById('clearCartBtn');

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
  list.innerHTML = '';

  if (cart.length === 0) {
    emptyMessage.textContent = 'Je winkelwagen is leeg.';
    totalPriceElement.textContent = '0,00';
    clearCartBtn.style.display = 'none';
    return;
  }

  emptyMessage.textContent = '';
  clearCartBtn.style.display = 'inline-block';

  let totaal = 0;

  cart.forEach((element, index) => {
    const row = document.createElement('tr');
    const regelTotaal = element.price * element.amount;

    totaal += regelTotaal;

    row.innerHTML = `
      <td>${element.name}</td>
      <td>${element.amount}</td>
      <td>€ ${formatPrice(element.price)}</td>
      <td>€ ${formatPrice(regelTotaal)}</td>
      <td>
        <button class="remove-item-btn" data-index="${index}">Verwijder</button>
      </td>
    `;

    list.appendChild(row);
  });

  totalPriceElement.textContent = formatPrice(totaal);

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

clearCartBtn.addEventListener('click', () => {
  localStorage.removeItem('cart');
  cart.length = 0;
  fillCartList();
});

fillCartList();