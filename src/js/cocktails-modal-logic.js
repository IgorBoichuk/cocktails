import { addCocktailToLocalStorage, removeCocktailFromLocalStorage } from './add-to-remove-localstorage';
import { fetchDrinkById } from './fetchFunction';
import { openIngredientsModal } from './modal-ingredients';  


const cocktailsModal = document.querySelector('[data-cocktails-modal]');
const closeCocktailsModalBtn = document.querySelector(
  '[data-cocktails-modal-close]'
);
const drinkInfo = document.querySelector('.cocktails-modal-content-wrap');
const cocktailsList = document.querySelector('.cocktail-list');

const docBody = document.querySelector('body');

export function toggleModal() {
  cocktailsModal.classList.toggle('is-hidden');
  docBody.classList.toggle('modal-cocktails-open');
}

closeCocktailsModalBtn.addEventListener('click', toggleModal);
cocktailsModal.addEventListener('click', e => {
  if (e.target !== cocktailsModal) {
    if (e.target.classList.contains('add-to-favorite')) {
      addCocktailToLocalStorage(e)
    }
    if (e.target.classList.contains('remove-from-favorite')) {
      removeCocktailFromLocalStorage(e)
    }
    return;
  }
  toggleModal();
});

export async function renderDrinkInfo(data) {
  const drink = data.drinks[0];
  
  const savedTheme = localStorage.getItem('ui-theme');

  const ingArr = [];
  let liMarkup;

  for (let i = 1; i < 16; i++) {
    const ingredient = drink[`strIngredient${i}`];
    let measure = drink[`strMeasure${i}`];
    if (ingredient) {
      if (!measure) {
        measure = '';
      }
      if (savedTheme === 'dark') {
        ingArr.push(
          `<li class="cocktail-ingredients-list-item" data-ingredient-name='${ingredient}'>
          <p class="js-ingredients-modal dark-theme-light-grey"><span class="dark-theme">&#10038;</span> ${measure} ${ingredient}</p>
        </li>`
        );
      } else {
        ingArr.push(
          `<li class="cocktail-ingredients-list-item" data-ingredient-name='${ingredient}'>
          <p class="js-ingredients-modal"><span>&#10038;</span> ${measure} ${ingredient}</p>
        </li>`
        );
      }
      liMarkup = ingArr.join('');
    }
  }

  let markup;

  if (savedTheme === 'dark') {
    markup = `<h2 class="cocktail-title dark-theme">${drink.strDrink}</h2>
      <div class="cocktail-description">
        <h3 class="cocktail-description__title dark-theme">Instructions:</h3>
        <p class="cocktail-description__text dark-theme-light-grey">
          ${drink.strInstructions}
        </p>
      </div>
      <img src="${drink.strDrinkThumb}" alt="${drink.strCategory}" class="cocktail-image" />
      <div class="cocktail-ingredients">
        <h3 class="cocktail-ingredients__title dark-theme">Ingredients</h3>
        <p class="cocktail-ingredients__remark dark-theme">Per cocktail</p>
        <ul class="cocktail-ingredients-list">
          ${liMarkup}
        </ul>
      </div>`;
    cocktailsModal.firstElementChild.classList.add('dark-size');
  } else {
    markup = `<h2 class="cocktail-title">${drink.strDrink}</h2>
      <div class="cocktail-description">
        <h3 class="cocktail-description__title">Instructions:</h3>
        <p class="cocktail-description__text">
          ${drink.strInstructions}
        </p>
      </div>
      <img src="${drink.strDrinkThumb}" alt="${drink.strCategory}" class="cocktail-image" />
      <div class="cocktail-ingredients">
        <h3 class="cocktail-ingredients__title">Ingredients</h3>
        <p class="cocktail-ingredients__remark">Per cocktail</p>
        <ul class="cocktail-ingredients-list">
          ${liMarkup}
        </ul>
      </div>`;
    cocktailsModal.firstElementChild.classList.remove('dark-size');
  }

  const localFavorite = JSON.parse(localStorage.getItem('favoriteList'))
  const favoriteCocktail = localFavorite.favoriteCocktails.map(el => {
    return el.idDrink;
  });
  if(favoriteCocktail.includes(Number(drink.idDrink))){
    document.querySelector('.cocktails-modal-favorite').classList.remove('add-to-favorite')
    document.querySelector('.cocktails-modal-favorite').classList.add('remove-from-favorite')
    document.querySelector('.cocktails-modal-favorite').innerText = 'Remove from favorite';
  }else{
    document.querySelector('.cocktails-modal-favorite').classList.add('add-to-favorite')
    document.querySelector('.cocktails-modal-favorite').classList.remove('remove-from-favorite')
    document.querySelector('.cocktails-modal-favorite').innerText = 'Add to favorite';
  }

  drinkInfo.innerHTML = markup;
  
  const modalIngredientsList = document.querySelector('.cocktail-ingredients-list')

  modalIngredientsList.addEventListener('click', openIngredientsModal)

}

export async function openCocktailsModal(e) {
  if (e.target.classList.contains('cocktail-item__learn-more')) {    
    const elemId = e.target.parentNode.dataset.idDrink;
    document.querySelector('.cocktails-modal').dataset.idDrink = elemId;
    const foundedDrink = await fetchDrinkById(elemId);
    renderDrinkInfo(foundedDrink);
    toggleModal();
  }
  if(e.target.classList.contains('cocktail-item__add-to')){
    addCocktailToLocalStorage(e)
  }
  if(e.target.classList.contains('cocktail-item__remove')){
    removeCocktailFromLocalStorage(e)
  }
}

cocktailsList.addEventListener('click', openCocktailsModal);
