const products = document.querySelectorAll('.product');

products.forEach(product => {
  const video = product.querySelector('video');

  product.addEventListener('mouseenter', () => {
    product.hoverTimeout = setTimeout(() => {
      video.currentTime = 0;
      video.play();
    }, 300);
  });

  product.addEventListener('mouseleave', () => {
    clearTimeout(product.hoverTimeout);
    video.pause();
    video.currentTime = 0;
  });
});