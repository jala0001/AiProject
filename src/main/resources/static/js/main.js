document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/food-offers')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debug-log for at se dataens struktur
        const container = document.getElementById('offers-container');

        // Iterér over hvert objekt i data-arrayet
        data.forEach(obj => {
          if (obj.clearances && Array.isArray(obj.clearances)) {
            obj.clearances.forEach(item => {
              const offerDiv = document.createElement('div');
              offerDiv.innerHTML = `
                        <h3>${item.product.description}</h3>
                        <p>Pris: ${item.offer.newPrice} ${item.offer.currency}</p>
                        <p>Rabat: ${item.offer.percentDiscount}%</p>
                        <img src="${item.product.image || 'placeholder.jpg'}" alt="${item.product.description}" />
                    `;
              container.appendChild(offerDiv);
            });
          } else {
            console.error('clearances er ikke defineret eller ikke et array for dette objekt:', obj);
          }
        });
      })
      .catch(error => console.error('Error fetching data:', error));
});
