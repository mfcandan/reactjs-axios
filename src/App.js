import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts'
})

class App extends Component {
  state = {
    posts: []
  }

  constructor() {
    super();
    this.getPosts();

  }

  getPosts = async () => {
    let data = await api.get('/').then(({data}) => data);
      this.setState({ posts: data});
  }

  createPost = async () => {
    let res = await api.post('/', {
      title: "Test",
      id: 4,
      author: 'test'
    });
    console.log(res);
    this.getPosts();
  }

  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <br></br>
          <button onClick={this.createPost}>CREATE POST</button>
          {this.state.posts.slice(0,3).map(post => 
            <h2 key={post.id}>{post.title}</h2>
          )}
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <br></br>
        </header>
      </div>
    );
  }
}
 
export default App;

