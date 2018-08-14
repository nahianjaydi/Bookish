import Search from './models/Search';
import Book from './models/Book';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as bookView from './views/bookView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';


const state = {};


// =================== Search Controler======================
const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    searchView.clearInput();
    searchView.clearResults();

    renderLoader(elements.searchRes);

    try {
      await state.search.getResults();
      clearLoader();

      searchView.renderResults(state.search.books);
    } catch (err) {
      alert('Something went wrong with the search!');
      clearLoader();
    }

  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.books, goToPage);
  }
});


// =================== Book Controler======================

const controlBook = async () => {
  const id = window.location.hash.replace('#', '');

  if (id) {

    bookView.clearBook();

    renderLoader(elements.book);

    if (state.book) searchView.clearHighLighted(state.book.id);
    if (state.search) searchView.highlightSelected(id);

    state.book = new Book(id);

    try {
      await state.book.getBook();

      clearLoader();
      bookView.renderBook(state.book, state.likes.isLiked(id));
    } catch (err) {
      alert('Error showing book details!');
    }

  }
};


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlBook));

// =================== List Controler======================

const controlList = () => {
  if (!state.list) state.list = new List();
  const id = state.book.id;
  const img = state.book.img;
  const title = state.book.title;
  const author = state.book.author;

  const item = state.list.addItem(id, img, title, author);
  listView.renderItem(item);

}

elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);

    listView.deleteItem(id);
  }
});

// =================== Like Controler======================


const controlLike = () => {
  if (!state.likes) state.likes = new Likes();

  const id = state.book.id;
  const img = state.book.img;
  const title = state.book.title;
  const author = state.book.author;

  if (!state.likes.isLiked(id)) {

    const newLike = state.likes.addLike(id, title, author, img);

    likesView.toggleLikeBtn(true);

    likesView.renderLikes(newLike);

  } else {
    state.likes.deleteLike(id);
    likesView.toggleLikeBtn(false);
    likesView.deleteLike(id);

  }

  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

window.addEventListener('load', () => {
  state.likes = new Likes();

  state.likes.readStorage();

  likesView.toggleLikeMenu(state.likes.getNumLikes());

  state.likes.likes.forEach(like => likesView.renderLikes(like));
});


elements.book.addEventListener('click', e => {
  if (e.target.matches('.book__btn--add, .book__btn--add *')) {
    controlList();
  } else if (e.target.matches('.book__love, .book__love *')) {
    controlLike();
  }
});





