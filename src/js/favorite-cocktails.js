import { fetchRandomCocktail } from "./fetchFunction";
import { renderCocktail } from "./render_function_for_cocktail";
import "./cocktails-modal-logic";
import { removeCocktailFromLocalStorage } from "./add-to-remove-localstorage";
import "./theme-switcher";
import "./header";
import { sliceArray, resetPagination, generatePagination } from './pagination';

document.addEventListener('DOMContentLoaded', generateCocktails)

// Todo: fix this
async function generateCocktails() {
  resetPagination();
  const localFavorite = JSON.parse(localStorage.getItem('favoriteList'));
  if (localFavorite === null || localFavorite.favoriteCocktails.length === 1 || localFavorite.favoriteCocktails.length === 0) {
    document.querySelector('.not-found').innerText = "You haven't added any favorite cocktails yet"
    return
  }
  const favoriteCocktails = localFavorite.favoriteCocktails;
  let drink = {
    drinks: []
  }
  
  
  const listOfCocktails = favoriteCocktails.forEach(element => {
    if (element.idDrink !== 0) {
      drink.drinks.push(element)
    }
  });
  generatePagination(drink)
  document.querySelector('.cocktail-list').innerHTML = renderCocktail(sliceArray(drink.drinks)).join('');
}

document.querySelector('.header-input').addEventListener('input', search)


function search(event){
  document.querySelector('.pagination').innerHTML = ''
  resetPagination()
  document.querySelector('.not-found').innerText = ''
  const localFavorite = JSON.parse(localStorage.getItem('favoriteList'));
  const regExprassio = new RegExp(event.target.value)
  let drink = {
    drinks: []
  }
  localFavorite.favoriteCocktails.forEach((el) =>{
    if(el.idDrink != 0){
      if(regExprassio.test(el.strDrink)){
        drink.drinks.push(el)
      }
    }
  })
  generatePagination(drink)
  document.querySelector('.cocktail-list').innerHTML = renderCocktail(sliceArray(drink.drinks)).join('');
  if(drink.drinks.length === 0){
    document.querySelector('.not-found').innerText = "Not found cocktail in your favorite"
  }
}