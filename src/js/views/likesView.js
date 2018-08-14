import { elements } from './base';

export const toggleLikeBtn = isliked => {
  const iconString = isliked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.book__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikes = likes => {
  const markup = `
    <li>
      <a class="likes__link" href="#${likes.id}">
          <figure class="likes__fig">
              <img src="${likes.img}" alt="${likes.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${likes.title}</h4>
              <p class="likes__author">${likes.author}</p>
          </div>
      </a>
    </li>
  `;
  elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href = "#${id}"]`).parentElement;
  if (el) el.parentElement.removeChild(el);
}