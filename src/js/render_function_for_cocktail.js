import { createPagination } from './pagination';

const svg = require('../images/icons.svg');

document.querySelector('.switcher-button').addEventListener('click', (event)=>{
    const savedColor = localStorage.getItem('ui-theme')
    const svgs = document.querySelectorAll('.svg')
    const names = document.querySelectorAll('.cocktail-item__name')
    svgs.forEach((el) =>{
        if (savedColor === "light" || savedColor === null) {
            el.classList.remove('svg-dark-theme')
            el.classList.add('svg-light')
        }else if (savedColor === "dark") {
            el.classList.remove('svg-light')
            el.classList.add('svg-dark-theme')
        }
    })
    names.forEach((el) =>{
        if (savedColor === "light" || savedColor === null) {
            el.classList.remove('name-dark')
            el.classList.add('name-light')
        }
        if (savedColor === "dark") {
            el.classList.remove('name-light')
            el.classList.add('name-dark')
        }
    })
})

export function renderCocktail(drink) {
    createPagination();
    let text, svgFill;
    const savedColor = localStorage.getItem('ui-theme')
    if (savedColor === "light" || savedColor === null) {
        text = 'name-dark';
        svgFill = 'svg-dark-theme'; 
    }
    if (savedColor === "dark") {
        text = 'name-light'
        svgFill = 'svg-light'
    }

    const drinks = drink.drinks
    const localFavorite = JSON.parse(localStorage.getItem('favoriteList'))
        let favoriteCocktail = localFavorite.favoriteCocktails.map((el) => {return el.idDrink})
        return drinks.map((drinkObj) =>{if(favoriteCocktail.includes(Number(drinkObj.idDrink))){
            return `<li class="cocktail-list__cocktail-item">
                        <img class="cocktail-item_img" src="${drinkObj.strDrinkThumb}" alt="preview ocktail" width="395" height="auto">
                        <p class="cocktail-item__name ${text}">${drinkObj.strDrink}</p>
                        <div class="button-wrap" data-id-drink='${drinkObj.idDrink}'>
                            <button type="button" class="cocktail-item__learn-more">Learn more</button>
                            <button type="button" class="cocktail-item__remove">Remove
                                <svg class="svg ${svgFill}" width="21" height="19">
                                    <use href="${svg}#icon-heart-filled"></use>
                                </svg>
                            </button>                                
                        </div>
                    </li>`;
    } else {
      return `<li class="cocktail-list__cocktail-item">
                        <img class="cocktail-item_img" src="${drinkObj.strDrinkThumb}" alt="preview ocktail" width="395" height="auto">
                        <p class="cocktail-item__name ${text}">${drinkObj.strDrink}</p>
                        <div class="button-wrap" data-id-drink='${drinkObj.idDrink}'>
                            <button type="button" class="cocktail-item__learn-more">Learn more</button>
                            <button type="button" class="cocktail-item__add-to">Add to 
                                <svg class="svg ${svgFill}" width="21" height="19">
                                    <use href="${svg}#icon-heart-empty"></use>
                                </svg>
                            </button>
                        </div>
                    </li>`;
    }
  });
}
