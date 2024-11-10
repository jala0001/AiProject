export const renderOffers = (data, container) => {
    container.innerHTML = ''; // Clear previous offers

    data.forEach(obj => {
        if (obj.clearances && Array.isArray(obj.clearances)) {
            obj.clearances.forEach(item => {
                const storeInfo = obj.store ? `
                    <p>Butik: ${obj.store.name}</p>
                    <p>Adresse: ${obj.store.address.street}, ${obj.store.address.zip} ${obj.store.address.city}</p>
                    <p>Mærke: ${obj.store.brand}</p>
                ` : '<p>Butiksinformation ikke tilgængelig</p>';

                const offerDiv = document.createElement('div');
                offerDiv.className = 'col-md-6 col-lg-4';

                // Implement the placeholder logic here
                const imgSrc = item.product.image || 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AC9frN1qFnn-I2JCycN8fw.png';
                offerDiv.innerHTML = `
                    <div class="card h-100">
                        <img src="${imgSrc}" onerror="this.src='https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AC9frN1qFnn-I2JCycN8fw.png';" class="card-img-top img-fluid" alt="${item.product.description}">
                        <div class="card-body">
                            <h5 class="card-title">${item.product.description}</h5>
                            <p class="card-text">Pris: ${item.offer.newPrice} ${item.offer.currency}</p>
                            <p class="card-text">Rabat: ${item.offer.percentDiscount}%</p>
                            ${storeInfo}
                        </div>
                    </div>
                `;
                container.appendChild(offerDiv);
            });
        } else {
            console.error('Clearances er ikke defineret eller ikke en liste for dette objekt:', obj);
        }
    });
};