export const fetchRecipe = async (topic) => {
    const response = await fetch(`http://localhost:8080/api/v1/joke?about=${encodeURIComponent(topic)}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Error fetching recipe');
    }

    return data;
};