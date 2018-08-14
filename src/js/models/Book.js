import axios from 'axios';
import { key } from '../config';


export default class Book {
  constructor(id) {
    this.id = id;
  }

  async getBook() {
    try {
      const res = await axios(`https://www.googleapis.com/books/v1/volumes/${this.id}?key=${key}`);
      this.title = res.data.volumeInfo.title;
      this.author = res.data.volumeInfo.authors;
      this.img = res.data.volumeInfo.imageLinks.small;
      this.description = res.data.volumeInfo.description;
      this.previewLink = res.data.volumeInfo.previewLink;
      this.publishedDate = res.data.volumeInfo.publishedDate;
      this.publisher = res.data.volumeInfo.publisher;
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  }
}