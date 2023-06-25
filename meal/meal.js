const backToHomeButton = document.getElementById("backToHomeButton");
backToHomeButton.addEventListener("click", navigateToHome);

function navigateToHome() {
  // Redirect to index.html
  window.location.href = "index.html";
}

// Retrieve the meal ID from sessionStorage
const mealId = sessionStorage.getItem("mealId");

// Use the meal ID to fetch the meal details and populate the page
if (mealId) {
  getMealDetails(mealId);
} else {
  handleMissingMealId();
}

async function getMealDetails(mealId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    const mealData = data.meals[0];

    // Populate meal detail page
    const mealName = document.getElementById("mealName");
    const mealImage = document.getElementById("mealImage");
    const mealInstructions = document.getElementById("mealInstructions");

    mealName.textContent = mealData.strMeal;
    mealImage.src = mealData.strMealThumb;
    mealInstructions.textContent = mealData.strInstructions;

    // Show meal detail page
    document.getElementById("home").style.display = "none";
    document.getElementById("mealDetail").style.display = "block";
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

function handleMissingMealId() {
  const mealName = document.getElementById("mealName");
  mealName.textContent = "Meal ID not found";
  // You can add additional error handling or display a message to the user.
}
