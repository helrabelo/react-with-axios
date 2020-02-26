import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
      const posts = response.data.slice(0, 6);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: 'Hel'
        };
      });
      this.setState({
        posts: updatedPosts
      });
    });
  }

  selectedPostHandler = id => {
    this.setState({
      selectedPostId: id
    });
    console.log('Id: ', id);
  };

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          title={post.title}
          key={post.id}
          author={post.author}
          clicked={() => this.selectedPostHandler(post.id)}
        />
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
