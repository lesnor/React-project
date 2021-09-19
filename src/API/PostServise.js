import axios from 'axios';

export default class PostServise {
  static async getAll(limit = 10, page = 1) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  static async getById(id) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
    return response;
  }
  static async getCommentsByPostId(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return response;
  }
}