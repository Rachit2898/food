// favourite.js

const favouriteList = document.getElementById("favouriteList");

function displayFavouriteMeals() {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.length > 0) {
    const favouriteItems = favourites
      .map(
        (item) => `
          <li class="favourite">
            ${item.name}
            <button class="remove" data-id="${item.id}">Remove</button>
          </li>
        `
      )
      .join("");
    favouriteList.innerHTML = favouriteItems;
  } else {
    favouriteList.innerHTML = "<li>No favourite meals selected.</li>";
  }
}
const backToHomeButton = document.getElementById("backToHomeButton");
backToHomeButton.addEventListener("click", navigateToHome);

function navigateToHome() {
  // Redirect to index.html
  window.location.href = "index.html";
}

// Call the function to display favourite meals on page load
displayFavouriteMeals();

favouriteList.addEventListener("click", removeFromFavourites);

function removeFromFavourites(event) {
  const meal = event.target;
  if (meal.classList.contains("remove")) {
    const mealId = meal.dataset.id;

    // Remove from local storage
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    favourites = favourites.filter((item) => item.id !== mealId);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    // Update favourite meals list
    displayFavouriteMeals();
  }
}
