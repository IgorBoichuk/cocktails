import { addIngredientToLocalStorage, removeIngredientFromLocalStorage } from "./add-to-remove-localstorage";
import { fetchIngredientByName } from "./fetchFunction";


const ingredientsModal = document.querySelector('[data-ingredients-modal]')
const closeIngredientsModalBtn = document.querySelector('[data-ingredients-modal-close]');
const modalBody = document.querySelector('.modal-drink-ingredients')


const insertModalContainer = document.querySelector('.js-insert-modal-container')

export let emtyObjectForLocalStorage = null



export function toggleIngredientsModal() {
  ingredientsModal.classList.toggle('is-hidden');
  ingredientsModal.classList.toggle('modal-open');
}



closeIngredientsModalBtn.addEventListener('click', toggleIngredientsModal);
ingredientsModal.addEventListener('click', e => {
  if (e.target !== ingredientsModal) {
    return;
  }
  toggleIngredientsModal();
});


document.querySelector('.modal-drink-ingredients').addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-favorite-ingredient')) {
    addIngredientToLocalStorage()
    return
  }
  if (event.target.classList.contains('remove-from-favorite-ingredient')) {
    removeIngredientFromLocalStorage(event)
    return
  }
})

export async function openIngredientsModal(e) {
  if (e.target.classList.contains('js-ingredients-modal')) {
    const elemName = e.target.parentNode.dataset.ingredientName.trim()
    const foundedIngredient = await fetchIngredientByName(elemName)

    emtyObjectForLocalStorage = foundedIngredient


    renderIngredientsModal(foundedIngredient);
    toggleIngredientsModal()
  }
  if (e.target.classList.contains('cocktail-item__remove')) {
    removeIngredientFromLocalStorage(e)
  }
}




export async function renderIngredientsModal(data) {
  const filteredIngredientObj = data.ingredients[0]
  // console.log(filteredIngredientObj);
  const keys = Object.keys(filteredIngredientObj);

  for (const key of keys) {

    if (filteredIngredientObj[key] === null || filteredIngredientObj[key] === undefined) {
      filteredIngredientObj[key] = '';
    }
  }

  // console.log(filteredIngredientObj);
  const {
    idIngredient: id,
    strABV: alcoVolume,
    strAlcohol: alcoPresence,
    strDescription: ingredientDescription,
    strIngredient: ingredientName,
    strType: ingredientType,
  } = filteredIngredientObj
  let firstWordofDescription = ""
  const arrayOfDescriptions =  ingredientDescription.split(' ')
  const splicedArray = arrayOfDescriptions.splice(0,1)
  const newDescription = arrayOfDescriptions.join(' ')

  if (splicedArray[0] !== "") {
    firstWordofDescription = splicedArray[0];
  }

  const alcoNumber = alcoVolume || 0

  const markuplight = `
     <h2 class="drink-name">${ingredientName}</h2>
      <h3 class="drink-category">${ingredientType}</h3>
        <div class="drink-category--wrapper">
          <div class="drink-category--line"></div>
        </div>
       
        <p class="drink-description"> <span class="modal-first-word-of-description-light">${firstWordofDescription}</span> ${newDescription}</p>

        <ul class="drink-classification-list">
          <li class="drink-classification-item">
            <p class="classification-type classification">
             ✶ Contains alcohol: <span class="classification-value">${alcoPresence}</span>
            </p>
          </li>

          <li class="drink-classification-item">
            <p class="classification-type classification">
              ✶ Alcohol by volume:
              <span class="classification-value">${alcoNumber} %</span>
            </p>
          </li>

        </ul>
    `
  const markupdark = `
     <h2 class="drink-name modal-ingredients-light-color">${ingredientName}</h2>
      <h3 class="drink-category modal-ingredients-light-color">${ingredientType}</h3>
        <div class="drink-category--wrapper">
          <div class="drink-category--line"></div>
        </div>
        <p class="drink-description modal-light-grey"> <span class="modal-first-word-of-description-dark">${firstWordofDescription}</span> ${newDescription}</p>


        <ul class="drink-classification-list">
          <li class="drink-classification-item">
            <p class="classification-type classification modal-ingredients-light-color">
             ✶ <span class="classification-value modal-light-grey" > Contains alcohol: ${alcoPresence}</span>
            </p>
          </li>

          <li class="drink-classification-item">
            <p class="classification-type classification modal-ingredients-light-color">
              ✶ 
              <span class="classification-value modal-light-grey">Alcohol by volume: ${alcoNumber} %</span>
            </p>
          </li>

        </ul>
    `

  
  
  const localFavorite = JSON.parse(localStorage.getItem('favoriteList'))
  const favoriteIngredients = localFavorite.favoriteIngrediants.map((el) => {
    return el.idIngredient
  })
  if (favoriteIngredients.includes(Number(id))) {
    document.querySelector('.drink-controller-btn--name').classList.remove('add-to-favorite-ingredient')
    document.querySelector('.drink-controller-btn--name').classList.add('remove-from-favorite-ingredient')
    document.querySelector('.drink-controller-btn--name').innerText = 'Remove from favorite'
  } else {
    document.querySelector('.drink-controller-btn--name').classList.add('add-to-favorite-ingredient')
    document.querySelector('.drink-controller-btn--name').classList.remove('remove-from-favorite-ingredient')
    document.querySelector('.drink-controller-btn--name').innerText = 'Add to favorite'
  }
  document.querySelector('[data-favorite-controller]').dataset.favoriteController = id
  


  const savedColor = localStorage.getItem('ui-theme')

  if (savedColor === "light" || savedColor === null) {

    modalBody.style.backgroundColor = '#FCFCFC'
    closeIngredientsModalBtn.style.fill = '#202025'
 

    

    insertModalContainer.innerHTML = markuplight

    
    
  }
  if (savedColor === "dark") {

    modalBody.style.backgroundColor = '#202025';
    
    closeIngredientsModalBtn.style.fill = '#FCFCFC';
    
    insertModalContainer.innerHTML = markupdark
    
   
  }
}


