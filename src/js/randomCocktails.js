import {
  addCocktailToLocalStorage,
  cokctailToFavorite,
  removeCocktailFromLocalStorage,
} from './add-to-remove-localstorage';

import { fetchRandomCocktail, findDrinkById } from './fetchFunction';
import { generatePagination, sliceArray } from './pagination';
import { renderCocktail } from './render_function_for_cocktail';

document.addEventListener('DOMContentLoaded', generateCocktails);
const localFavorite = JSON.parse(localStorage.getItem('favoriteList'));
if (localFavorite == null) {
  let fav = { favoriteCocktails: [{ idDrink: 0 }], favoriteIngrediants: [{idIngredient: 0}] };
  localStorage.setItem('favoriteList', JSON.stringify(fav));
}

async function generateCocktails() {
  let listOfCocktails = '';
  let cocktailArr = { drinks: [] };
  const windowWidth = window.innerWidth;
  let cocktailCount = 3;
  if (windowWidth >= 768) {
    cocktailCount = 6;
  }
  if (windowWidth >= 1280) {
    cocktailCount = 9;
  }
  for (let i = 1; i <= cocktailCount; i++) {
    let drink = await fetchRandomCocktail();
    while (
      cocktailArr.drinks
        .map(el => {
          return el.idDrink;
        })
        .includes(drink.drinks[0].idDrink)
    ) {
      drink = await fetchRandomCocktail();
    }
    cocktailArr.drinks.push(drink.drinks[0]);
  }
  generatePagination(cocktailArr);
  const slicedArray = sliceArray(cocktailArr.drinks);
  const cocktailListArr = renderCocktail(slicedArray);
  document.querySelector('.cocktail-title-main').innerText = 'Cocktails';
  document.querySelector('.cocktail-list').innerHTML = cocktailListArr.join('');
}
