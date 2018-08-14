import { elements } from './base';

export const renderItem = item => {
  const markup = `
    <li class="shopping__item" data-itemid = ${item.id}>
      <a class="results__link" href="#">
          <figure class="results__fig">
              <img src="${item.img}" alt="${item.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${item.title}</h4>
              <p class="results__author">${item.author}</p>
          </div>
      </a>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
    </li>
  `;
  elements.shopping.insertAdjacentHTML('beforeend', markup);
}
export const deleteItem = id => {
  const item = document.querySelector(`[data-itemid = "${id}"]`);
  if (item) item.parentElement.removeChild(item);
}