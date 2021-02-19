import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
  headers: {
    'X-auth-key': "token123"
  }
})

class App extends Component {
  state = {
    posts: [],
    limit: 2,
  }

  constructor() {
    super();
    this.getPosts();

  }

  getPosts = async () => {
    try {
      //Eğer tek api kullanılıyorsa
      /*
      let data = await api.get('/', {
        params: {
          _limit: 10,
          _start: 0
        }
      }).then(({ data }) => data);
      this.setState({ posts: data});
      */
      //Tek Değilse:
      
      let data = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/posts',
        params: { _limit: this.state.limit}
      }).then(({data}) => data);
      this.setState({ posts: data});
      
    } catch (error) {
      console.log(error);
    }
    
  }

  createPost = async () => {
    let res = await api
      .post('/', {title: "Test", id: 4, author: 'test'})
      .catch( error => console.log(error));
    console.log(res);
    this.getPosts();
  }

  deletePost = async (id) => {
    let data = await api.delete(`/${id}`);
    this.getPosts();
    console.log(data);
  }

  updatePost = async (id, val) => {
    let data = await api.patch(`/${id}`, { title: val })
    this.getPosts();
    console.log(data);
  }

  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <br></br>
          <button onClick={this.createPost}>CREATE TEMP POST</button>
          {this.state.posts.map(post => 
            <h2 key={post.id}>
              {post.title}
              <button onClick={()=> this.deletePost(post.id)}>Delete</button> 
              <button onClick={()=> this.updatePost(post.id, `${post.title}FATİH`)}>Update</button>
            </h2>
          )}
          <br></br>
        </header>
      </div>
    );
  }
}
 
export default App;

