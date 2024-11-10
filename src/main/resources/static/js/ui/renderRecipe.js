export const renderRecipe = (data, resultElement) => {
    resultElement.innerHTML = data.answer.replace(/\n/g, "<br>") || "No recipe found for the given topic.";
};