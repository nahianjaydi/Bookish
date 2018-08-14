
import axios from 'axios';
import { key } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {

    try {
      const res = await axios(`https://www.googleapis.com/books/v1/volumes?q=${this.query}&printType=books&maxResults=25&key=${key}`);
      this.books = res.data.items;
    } catch (error) {
      alert(error);
    }
  }
}
