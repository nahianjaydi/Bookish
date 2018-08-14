// import uniqid from 'uniqid';
export default class List {
  constructor() {
    this.items = [];
  }

  addItem(id, img, title, author) {
    const item = {
      id,
      img,
      title,
      author
    }
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1);
  }

}