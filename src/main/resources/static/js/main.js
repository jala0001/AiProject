document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('offers-container');

    // Funktion til at hente tilbud baseret på postnummer
    const fetchFoodOffers = (zip) => {
        fetch(`/api/food-offers?zip=${zip}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fejl fra serveren: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Hentede fødevaretilbud:', data);
                container.innerHTML = ''; // Ryd tidligere tilbud

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
                            offerDiv.innerHTML = `
                                <div class="card h-100">
                                    <img src="${item.product.image || 'images/placeholder.jpg'}" class="card-img-top img-fluid" alt="${item.product.description}">
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
            })
            .catch(error => console.error('Fejl ved hentning af fødevaretilbud:', error));
    };

    // Event listener for "Find Tilbud" knappen
    document.getElementById("btn-get-offers").addEventListener("click", () => {
        const zip = document.getElementById("postalCode").value.trim();
        if (zip) {
            fetchFoodOffers(zip); // Kald funktionen med brugerindtastet postnummer
        } else {
            alert("Indtast venligst et postnummer.");
        }
    });
});

// Fetch the recipe on button click without affecting the food offers
document.getElementById("btn-get-recipe").addEventListener("click", async function () {
    const topic = document.getElementById("about").value.trim();
    const spinner = document.getElementById("spinner");
    const result = document.getElementById("recipe-result");

    if (!topic) {
        alert("Please enter a recipe topic.");
        return;
    }

    // Show loading spinner
    spinner.style.display = "inline-block";
    result.innerHTML = ""; // Clear previous result

    try {
        const response = await fetch(`http://localhost:8080/api/v1/joke?about=${encodeURIComponent(topic)}`);
        const data = await response.json();

        console.log("Recipe Response Data:", data);

        if (response.ok) {
            result.innerHTML = data.answer.replace(/\n/g, "<br>") || "No recipe found for the given topic.";
        } else {
            result.textContent = "Error fetching recipe. Please try again.";
        }
    } catch (error) {
        console.error("Error fetching recipe:", error);
        result.textContent = "Error fetching recipe. Please try again.";
    } finally {
        spinner.style.display = "none";
    }
});
