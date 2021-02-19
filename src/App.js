import React, { useState, useEffect,  Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
  headers: {
    'X-auth-key': "token123"
  }
})

function App () {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    //effect
    getPosts();
    return () => {
      console.log("cleanup use effect")
    }
  }, [api]);

  const getPosts = async () => {
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
        params: { _limit: limit}
      }).then(({data}) => data);
      setPosts(data);
      
    } catch (error) {
      console.log(error);
    }
    
  }

  const createPost = async () => {
    let res = await api
      .post('/', {title: "Test", id: 4, author: 'test'})
      .catch( error => console.log(error));
    console.log(res);
    getPosts();
  }

  const deletePost = async (id) => {
    let data = await api.delete(`/${id}`);
    getPosts();
    console.log(data);
  }

  const updatePost = async (id, val) => {
    let data = await api.patch(`/${id}`, { title: val })
    getPosts();
    console.log(data);
  }

  return (
      <div className="App">
        <header className="App-header">
          <br></br>
          <button onClick={createPost}>CREATE TEMP POST</button>
          {posts.map(post => 
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
 
export default App;

