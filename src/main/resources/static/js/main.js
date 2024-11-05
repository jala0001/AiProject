// Load the food offers list on page load
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('offers-container');

    fetch('/api/food-offers')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Food Offers:', data);


            data.forEach(obj => {
                if (obj.clearances && Array.isArray(obj.clearances)) {
                    obj.clearances.forEach(item => {
                        const storeInfo = obj.store ? `
                            <p>Store: ${obj.store.name}</p>
                            <p>Address: ${obj.store.address.street}, ${obj.store.address.zip} ${obj.store.address.city}</p>
                            <p>Brand: ${obj.store.brand}</p>
                        ` : '<p>Store information not available</p>';

                        const offerDiv = document.createElement('div');
                        offerDiv.classList.add('offer-item');
                        offerDiv.innerHTML = `
                            <h3>${item.product.description}</h3>
                            <p>Price: ${item.offer.newPrice} ${item.offer.currency}</p>
                            <p>Discount: ${item.offer.percentDiscount}%</p>
                            ${storeInfo}
                            <img src="${item.product.image || 'images/placeholder.jpg'}" alt="${item.product.description}" class="img-thumbnail" />
                        `;
                        container.appendChild(offerDiv);
                    });
                } else {
                    console.error('Clearances is not defined or not an array for this object:', obj);
                }
            });
        })
        .catch(error => console.error('Error fetching food offers:', error));
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

        console.log("Recipe Response Data:", data); // Debugging: Check response structure

        if (response.ok) {
            // Display the recipe answer with formatting for line breaks
            result.innerHTML = data.answer.replace(/\n/g, "<br>") || "No recipe found for the given topic.";
        } else {
            result.textContent = "Error fetching recipe. Please try again.";
        }
    } catch (error) {
        console.error("Error fetching recipe:", error);
        result.textContent = "Error fetching recipe. Please try again.";
    } finally {
        // Hide the spinner after request is complete
        spinner.style.display = "none";
    }
});
