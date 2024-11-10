import { fetchFoodOffers } from './api/fetchFoodOffers.js';
import { fetchRecipe } from './api/fetchRecipe.js';
import { renderOffers } from './ui/renderOffers.js';
import { renderRecipe } from './ui/renderRecipe.js';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('offers-container');
    const resultElement = document.getElementById("recipe-result");
    const spinner = document.getElementById("spinner");

    // Event listener for "Find Tilbud" button
    document.getElementById("btn-get-offers").addEventListener("click", () => {
        const zip = document.getElementById("postalCode").value.trim();
        if (zip) {
            fetchFoodOffers(zip)
                .then(data => renderOffers(data, container))
                .catch(error => console.error('Fejl ved hentning af fødevaretilbud:', error));
        } else {
            alert("Indtast venligst et postnummer.");
        }
    });

    // Event listener for recipe button
    document.getElementById("btn-get-recipe").addEventListener("click", async () => {
        const topic = document.getElementById("about").value.trim();

        if (!topic) {
            alert("Please enter a recipe topic.");
            return;
        }

        spinner.style.display = "inline-block";
        resultElement.innerHTML = ""; // Clear previous result

        try {
            const data = await fetchRecipe(topic);
            renderRecipe(data, resultElement);
        } catch (error) {
            console.error("Error fetching recipe:", error);
            resultElement.textContent = "Error fetching recipe. Please try again.";
        } finally {
            spinner.style.display = "none";
        }
    });
});