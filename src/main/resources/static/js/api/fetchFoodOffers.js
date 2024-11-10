export const fetchFoodOffers = (zip) => {
    return fetch(`/api/food-offers?zip=${zip}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fejl fra serveren: ${response.status}`);
            }
            return response.json();
        });
};