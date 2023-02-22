import IconHeart from '../images/icons.svg';
import { openIngredientsModal } from './modal-ingredients';
import "./theme-switcher";
import "./header";
import { sliceArray, resetPagination, generatePagination, createPagination } from './pagination';

const modalIngredientsListM = document.querySelector('.card-list');
modalIngredientsListM.addEventListener('click', openIngredientsModal);

document.querySelector('.switcher-button').addEventListener('click', (event)=>{
  console.log(event.target);
  const savedColor = localStorage.getItem('ui-theme')
  const names = document.querySelectorAll('.card-item__name')
  const types = document.querySelectorAll('.card-item__details')
  names.forEach((el) =>{
      if (savedColor === "light" || savedColor === null) {
        el.classList.remove('name-light')
        el.classList.add('name-dark')
      }
      if (savedColor === "dark") {
        el.classList.remove('name-dark')
        el.classList.add('name-light')
      }
  })
  types.forEach((el) =>{
    if (savedColor === "light" || savedColor === null) {
      el.classList.remove('name-light')
      el.classList.add('name-dark')
    }
    if (savedColor === "dark") {
      el.classList.remove('name-dark')
      el.classList.add('name-light')
    }
})
})

const renderIngredients = (element) => {
  const name = element.nameIngredient;
  const details = element.typeIngredient;
  const id = element.idIngredient;
  let text;
  const savedColor = localStorage.getItem('ui-theme')
  if (savedColor === "light" || savedColor === null) {
      text = 'name-dark';
  }
  if (savedColor === "dark") {
      text = 'name-light'
  }
  return `
    <div class="cocktail-list__cocktail-item">
      <div class='card-item__info'>
        <p class="card-item__name ${text}">${name}</p>
        <p class="card-item__details ${text}">${details}</p>
        <div data-ingredient-name="${name}" data-ingredient-id="${id}" class="button-wrap">
          <button type="button" class="cocktail-item__learn-more js-ingredients-modal">Learn more</button>
          <button type="button" class="cocktail-item__remove">Remove
            <svg class="svg" width="21" height="19">
              <use href="${IconHeart}#icon-heart-filled"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
}

const getRandomIngredients = (htmlEl) => {
  // Todo: get data
  const localFavorite = JSON.parse(localStorage.getItem('favoriteList'));
  if (localFavorite === null || localFavorite.favoriteIngrediants.length === 0 || localFavorite.favoriteIngrediants.length === 1) {
    document.querySelector('.not-found').innerText = "You haven't added any favorite ingredients yet"
    return
  }
  const favoriteIngredient = localFavorite.favoriteIngrediants;
  let drink = {
    drinks: [],
  };

  favoriteIngredient.forEach(element => {
    if (element.idIngredient !== 0) {
      drink.drinks.push(element);
    }
  });
  generatePagination(drink)
  const favoriteIngredients = sliceArray(drink.drinks);

  let content = '';
  createPagination();
  favoriteIngredients.drinks.forEach(element => {
    if (element.idIngredient !== 0) {
      content += renderIngredients(element);
    }
  });

  htmlEl.innerHTML = content;

}

const init = () => {
  resetPagination();
  const ingredientsEl = document.querySelector('.ingredients__js');

  if (ingredientsEl) {
    getRandomIngredients(ingredientsEl);

  }
}

document.addEventListener('DOMContentLoaded', init)


document.querySelector('.header-input').addEventListener('input', search)


function search(event){
  document.querySelector('.pagination').innerHTML = ''
  resetPagination()
  document.querySelector('.not-found').innerText = ''
  const localFavorite = JSON.parse(localStorage.getItem('favoriteList'));
  const regExprassio = new RegExp(event.target.value)
  let content =''
  let drink = {
    drinks: []
  }
  localFavorite.favoriteIngrediants.forEach((el) =>{
    if(el.idIngredient != 0){
      if(regExprassio.test(el.nameIngredient.toLowerCase())){
        drink.drinks.push(el)
      }
    }
  })
  generatePagination(drink)
  let slicedArray = sliceArray(drink.drinks)
  createPagination();
  slicedArray.drinks.forEach(element => {
    if (element.idIngredient !== 0) {
      content += renderIngredients(element);
    }
  });
  document.querySelector('.ingredients__js').innerHTML = content
  if(content.length === 0){
    document.querySelector('.not-found').innerText = "Not found ingredient in your favorite"
  }
}