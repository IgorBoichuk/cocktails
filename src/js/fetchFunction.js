const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export async function fetchDrinksByName(drinkName) {
  try {
    const response = await fetch(`${BASE_URL}search.php?s=${drinkName}`);
    const drinks = await response.json();
    return drinks;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchDrinkById(drinkId) {
  try {
    const response = await fetch(`${BASE_URL}lookup.php?i=${drinkId}`);
    const drink = await response.json();
    return drink;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchRandomCocktail() {
    try {
      const response = await fetch(`${BASE_URL}random.php`);
      const drink = await response.json();
      return drink;
    } catch (error) {
      console.log(error.message);
    }
  }

  export async function fetchDrinkByLetter(letter) {
    try {
      const response = await fetch(`${BASE_URL}search.php?f=${letter}`);
      const drink = await response.json();
      return drink;
    } catch (error) {
      console.log(error.message);
    }
  }

  export async function fetchIngredientById(ingredientId) {
    try {
      const response = await fetch(`${BASE_URL}lookup.php?iid=${ingredientId}`);
      const drink = await response.json();
      return drink;
    } catch (error) {
      console.log(error.message);
    }
  }


  export async function fetchIngredientByName(ingredientName) {
    try {
      const response = await fetch(`${BASE_URL}search.php?i=${ingredientName}`);
      const drink = await response.json();
      return drink;
    } catch (error) {
      console.log(error.message);
    }
  }