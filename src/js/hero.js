import { fetchDrinkByLetter } from './fetchFunction';
import { renderCocktail } from './render_function_for_cocktail';
import { sliceArray, resetPagination, generatePagination } from './pagination';

const localFavorite = JSON.parse(localStorage.getItem('favoriteList'));
if (localFavorite == null) {
  let fav = { favoriteCocktails: [{ idDrink: 0 }], favoriteIngrediants: [] };
  localStorage.setItem('favoriteList', JSON.stringify(fav));
}

const svg = require('../images/icons.svg');

const mobileSelect = document.querySelector('.mobile-wrapper-select');
const mobileFilter = document.querySelector('.list-mobile-filter');
const mobileListLetters = document.querySelector('.mobile-list-letters');
const spanHeroMobile = document.querySelector('.hero__select-text');
const cocktailList = document.querySelector('.cocktail-list');
const titleCoctail = document.querySelector('.cocktail-title-main');
const notFound = document.querySelector('.not-found');

const desktopFilter = document.querySelector('.wrapper-tablet-desktop-filter');

async function onClickMobile(e) {
  resetPagination();
  if (e.target.nodeName === 'LI') {
    spanHeroMobile.textContent = e.target.textContent;
    mobileFilter.classList.add('visually-hidden');
    mobileSelect.classList.add('active');

    cocktailList.innerHTML = '';
    const response = await fetchDrinkByLetter(e.target.textContent);

    if (response.drinks === null) {
      titleCoctail.textContent = "Sorry, we didn't find any cocktail for you";
      notFound.innerHTML = `<svg
          class="icon-not_found"
          width="280"
          height="308"              
        >
          <use href="${svg}#icon-not-found"></use>
        </svg>`;
      return;
    }
    notFound.innerHTML = '';
    titleCoctail.textContent = 'Searching results';
    generatePagination(response);
    const slicedArray = sliceArray(response.drinks);
    const markup = await renderCocktail(slicedArray);
    cocktailList.insertAdjacentHTML('beforeend', markup.join(''));
  }
}
const onClick = async e => {
  resetPagination();
  if (e.target.nodeName === 'LI') {
    cocktailList.innerHTML = '';
    const response = await fetchDrinkByLetter(e.target.textContent);
    if (response.drinks === null) {
      titleCoctail.textContent = "Sorry, we didn't find any cocktail for you";
      notFound.innerHTML = `<svg
        class="icon-not_found"
        width="345"
        height="380"              
      >
        <use href="${svg}#icon-not-found"></use>
      </svg>`;
      document.querySelector('.pagination').innerHTML = '';
      return;
    }
    notFound.innerHTML = '';
    titleCoctail.textContent = 'Searching results';
    generatePagination(response);
    const slicedArray = sliceArray(response.drinks);
    const markup = await renderCocktail(slicedArray);
    cocktailList.insertAdjacentHTML('beforeend', markup.join(''));
  }
};

function onSwitch(target) {
  const arrayItem = document.querySelectorAll('.word');
  const prevActiveItem = [...arrayItem].find(item =>
    item.classList.contains('active')
  );
  //   const preActiveItem = [].find.call(arrayItem, item =>
  //     item.classList.contains('active')
  //   );
  if (prevActiveItem) {
    prevActiveItem.classList.remove('active');
    target.classList.add('active');
  }
  target.classList.add('active');
}

mobileSelect.addEventListener('click', () => {
  mobileFilter.classList.toggle('visually-hidden');
});

mobileListLetters.addEventListener('click', onClickMobile);

desktopFilter.addEventListener('click', e => {
  if (e.target.nodeName === 'LI') {
    onSwitch(e.target);
  }
  onClick(e);
});
