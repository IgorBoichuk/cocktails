import { fetchDrinkById } from './fetchFunction';
import { emtyObjectForLocalStorage } from './modal-ingredients'
import { renderCocktail } from './render_function_for_cocktail';
const svg = require('../images/icons.svg');


export class cokctailToFavorite {
  constructor(drink) {
    this.idDrink = Number(drink.drinks[0].idDrink);
    this.strDrinkThumb = drink.drinks[0].strDrinkThumb;
    this.strDrink = drink.drinks[0].strDrink;
    this.strInstructions = drink.drinks[0].strInstructions;
    this.ingrediant = [];
    for (let i = 1; i <= 15; i++) {
      let ingrediantObj = { measure: '', ingrediantName: '' };
      let name = 'strIngredient' + i;
      let measure = 'strMeasure' + i;
      if (drink.drinks[0][name] != null) {
        ingrediantObj.measure = drink.drinks[0][measure];
        ingrediantObj.ingrediantName = drink.drinks[0][name];
        this.ingrediant.push(ingrediantObj);
      } else {
        break;
      }
    }
  }
}

class ingredientFavorite {
  constructor(ingredient) {
    this.idIngredient = Number(ingredient.ingredients[0].idIngredient)
    this.nameIngredient = ingredient.ingredients[0].strIngredient
    this.descriptionIngredient = ingredient.ingredients[0].strDescription
    this.typeIngredient = ingredient.ingredients[0].strType
    this.alcoholIngredient = ingredient.ingredients[0].strAlcohol
  }
}

export async function addCocktailToLocalStorage(event) {
  const localFavorite = JSON.parse(localStorage.getItem('favoriteList'));
  const drinkId = event.target.parentNode.dataset.idDrink;
  const drink = await fetchDrinkById(drinkId);
  const cocktail = new cokctailToFavorite(drink);
  localFavorite.favoriteCocktails.push(cocktail);
  localStorage.setItem('favoriteList', JSON.stringify(localFavorite));

  if (event.target.parentNode.parentNode.parentNode.classList.contains('main-section')) {
    document.querySelector('.cocktail-list').innerHTML += renderCocktail(drink)
  } else {
    document.querySelector(
      `[data-id-drink = '${drinkId}'] .cocktail-item__add-to`
    ).className = 'cocktail-item__remove';
    document.querySelector(
      `[data-id-drink = '${drinkId}'] .cocktail-item__remove`
    ).innerHTML = `Remove
      <svg class="svg" width="21" height="19">
          <use href="${svg}#icon-heart-filled"></use>
      </svg>`;
  }

  if (event.target.classList.contains('add-to-favorite')) {
    document
      .querySelector(`[data-id-drink = '${drinkId}'] .cocktails-modal-favorite`)
      .classList.remove('add-to-favorite');
    document
      .querySelector(`[data-id-drink = '${drinkId}'] .cocktails-modal-favorite`)
      .classList.add('remove-from-favorite');
    document.querySelector(
      `[data-id-drink = '${drinkId}'] .cocktails-modal-favorite`
    ).innerText = 'Remove from favorite';
  }
}

export function removeCocktailFromLocalStorage(event) {
  let localFavorite = JSON.parse(localStorage.getItem('favoriteList'));
  const drinkId = Number(event.target.parentNode.dataset.idDrink);
  localFavorite.favoriteCocktails = localFavorite.favoriteCocktails.filter(
    el => {
      if (el.idDrink != drinkId) {
        return el;
      }
    }
  );
  localStorage.setItem('favoriteList', JSON.stringify(localFavorite));

  document.querySelector(
    `[data-id-drink = '${drinkId}'] .cocktail-item__remove`
  ).className = 'cocktail-item__add-to';
  document.querySelector(
    `[data-id-drink = '${drinkId}'] .cocktail-item__add-to`
  ).innerHTML = `Add to 
    <svg class="svg" width="21" height="19">
        <use href="${svg}#icon-heart-empty"></use>
    </svg>`;

  if (event.target.classList.contains('remove-from-favorite')) {
    document
      .querySelector(`[data-id-drink = '${drinkId}'] .cocktails-modal-favorite`)
      .classList.add('add-to-favorite');
    document
      .querySelector(`[data-id-drink = '${drinkId}'] .cocktails-modal-favorite`)
      .classList.remove('remove-from-favorite');
    document.querySelector(
      `[data-id-drink = '${drinkId}'] .cocktails-modal-favorite`
    ).innerText = 'Add to favorite';
  }

  if (event.target.parentNode.parentNode.parentNode.parentNode.classList.contains('main-section') || event.target.parentNode.parentNode.parentNode.classList.contains('main-section')) {
    const cocktailsList = document.querySelector(".cocktail-list")
    for (const childItem of cocktailsList.children) {
      for (const child of childItem.children) {
        if (child.dataset.idDrink !== undefined) {
          if (child.dataset.idDrink === event.target.parentNode.dataset.idDrink) {
            childItem.remove()
          }
        }
      }
    }
    if(cocktailsList.children.length === 0){
      document.querySelector('.not-found').innerText = "You haven't added any favorite cocktails yet"
    }
  }
}


export function addIngredientToLocalStorage() {
  let localFavorite = JSON.parse(localStorage.getItem('favoriteList'))
  localFavorite.favoriteIngrediants.push(new ingredientFavorite(emtyObjectForLocalStorage))
  localStorage.setItem('favoriteList', JSON.stringify(localFavorite))
  document.querySelector('.drink-controller-btn--name').classList.remove('add-to-favorite-ingredient')
  document.querySelector('.drink-controller-btn--name').classList.add('remove-from-favorite-ingredient')
  document.querySelector('.drink-controller-btn--name').innerText = 'Remove from favorite'
}

export function removeIngredientFromLocalStorage(event) {
  let idIngredient = Number(event.target.parentNode.dataset.favoriteController)
  if (event.target.parentNode.dataset.favoriteController === undefined) {
    idIngredient = Number(event.target.parentNode.dataset.ingredientId)
  }
  let localFavorite = JSON.parse(localStorage.getItem('favoriteList'))
  localFavorite.favoriteIngrediants = localFavorite.favoriteIngrediants.filter(
    el => {
      if (el.idIngredient !== idIngredient) {
        return el;
      }
    }
  );
  localStorage.setItem('favoriteList', JSON.stringify(localFavorite))
  document.querySelector('.drink-controller-btn--name').classList.add('add-to-favorite-ingredient')
  document.querySelector('.drink-controller-btn--name').classList.remove('remove-from-favorite-ingredient')
  document.querySelector('.drink-controller-btn--name').innerText = 'Add to favorite'
  if (event.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('main-section') || event.target.parentNode.parentNode.parentNode.parentNode.classList.contains('main-section')) {
    const ingredientList = document.querySelector(".card-list")
    for (const childItem of ingredientList.children) {
      for (const childCard of childItem.children) {
        for (const child of childCard.children) {
          if (child.dataset.ingredientId != undefined) {
            if (Number(child.dataset.ingredientId) === idIngredient) {
              childItem.remove()
            }
          }
        }
      }
    }
    if(ingredientList.children.length === 0){
      document.querySelector('.not-found').innerText = "You haven't added any favorite ingredients yet"
    }
  }
}