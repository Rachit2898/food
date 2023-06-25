const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const viewFavouritesButton = document.getElementById("viewFavouritesButton");
viewFavouritesButton.addEventListener("click", navigateToFavouriteMeals);

searchInput.addEventListener("input", debounce(searchMeals, 300));

function navigateToFavouriteMeals() {
  // Redirect to favourite-meals.html
  window.location.href = "favourite-meals.html";
}

function debounce(func, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
}

async function searchMeals() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    searchResults.innerHTML = "";
    return;
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    const data = await response.json();
    const meals = data.meals;

    if (meals) {
      const mealItems = meals.map((meal) => createMealItem(meal)).join("");
      searchResults.innerHTML = mealItems;
    } else {
      searchResults.innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

function createMealItem(meal) {
  return `
    <div class="meal" data-id="${meal.idMeal}">
      <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="meal-name">${meal.strMeal}</div>
      <button class="favourite-button">Add to Favourites</button>
    </div>
  `;
}

// Update the event listener for searchResults to delegate the click event to the meal divs
searchResults.addEventListener("click", navigateToMealDetail);

function navigateToMealDetail(event) {
  const meal = event.target.closest(".meal");
  if (meal && !event.target.classList.contains("favourite-button")) {
    const mealId = meal.dataset.id;
    sessionStorage.setItem("mealId", mealId);
    window.location.href = "meal-detail.html";
  }
}

const favouriteList = document.getElementById("favouriteList");
searchResults.addEventListener("click", addToFavourites);

function addToFavourites(event) {
  const meal = event.target;
  if (meal.classList.contains("favourite-button")) {
    const mealItem = meal.closest(".meal");
    const mealId = mealItem.dataset.id;
    const mealName = mealItem.querySelector(".meal-name").textContent;

    // Add to local storage
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favourites.find((item) => item.id === mealId)) {
      favourites.push({ id: mealId, name: mealName });
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }
}

displayFavouriteMeals();

const mealDetail = document.getElementById("mealDetail");
mealDetail.addEventListener("click", closeMealDetail);

function closeMealDetail() {
  mealDetail.style.display = "none";
  document.getElementById("home").style.display = "block";
}

searchResults.addEventListener("click", openMealDetail);

async function openMealDetail(event) {
  const meal = event.target;
  if (meal.classList.contains("meal")) {
    const mealId = meal.dataset.id;

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

      // Save the meal ID in sessionStorage to pass it to meal-detail.html
      sessionStorage.setItem("mealId", mealId);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }
}
