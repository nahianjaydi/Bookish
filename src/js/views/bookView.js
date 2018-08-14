import { elements } from './base';

export const clearBook = () => {
    elements.book.innerHTML = '';
};

export const renderBook = (book, isLiked) => {
    const markup = `

            <figure class="book__fig">
                <img src="${book.img}" alt="${book.title}" class="book__img">
                <h1 class="book__title">
                    <span>${book.title}</span>
                </h1>
            </figure>

            <div class="book__details">
                <div class="book__info">
                    <img class="book__love" src="img/written-by.png"  alt="Written by}">
                    <p>${book.author.join(', ')}<p>
                </div>
                <button class="book__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>

            <div class="book__descriptions">
                <p class="book__directions-text">${book.description}</p>

                <button class="btn-small book__btn book__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="book__directions">
                <h2 class="heading-2">Published By</h2>
                <p class="book__directions-text">
                    This book was published in <span class="book__by">${book.publishedDate}</span> by
                    <span class="book__by">${book.publisher}</span>. For further information, please click the preview button below.
                </p>
                <a class="btn-small book__btn" href="${book.previewLink}" target="_blank">
                    <span>Preview</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </a>
            </div>

  `;
    elements.book.insertAdjacentHTML('afterbegin', markup);
};