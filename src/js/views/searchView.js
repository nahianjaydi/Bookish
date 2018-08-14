import { elements } from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const clearHighLighted = previousId => {
  if (document.querySelector(`.results__link[href="#${previousId}"]`)) {
    document.querySelector(`.results__link[href="#${previousId}"]`).classList.remove('results__link--active');
  }
};

export const highlightSelected = id => {
  // const resultArr = Array.from(document.querySelectorAll('.results__link'));
  // resultArr.forEach(el => {
  //   el.classList.remove('results__link--active');
  // })
  document.querySelector(`.results__link[href = "#${id}"]`).classList.add('results__link--active');
};

const renderBook = book => {
  const markup = `
    <li>
      <a class="results__link" href="#${book.id}">
          <figure class="results__fig">
              <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${book.volumeInfo.title}</h4>
              <p class="results__author">${book.volumeInfo.authors}</p>
          </div>
      </a>
    </li>
  `;
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
  </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (books, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  books.slice(start, end).forEach(renderBook);
  renderButtons(page, books.length, resPerPage);
};