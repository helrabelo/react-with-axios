import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidUpdate() {
    this.props.id
      ? !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
        ? axios
            .get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
              this.setState({ loadedPost: response.data });
              console.log(response);
            })
        : null
      : null;
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    this.props.id
      ? (post = <p style={{ textAlign: 'center' }}>Loading...</p>)
      : null;
    this.state.loadedPost
      ? (post = (
          <div className="FullPost">
            <h1>{this.state.loadedPost.title}</h1>
            <p>{this.state.loadedPost.body}</p>
            <div className="Edit">
              <button className="Delete">Delete</button>
            </div>
          </div>
        ))
      : null;

    return post;
  }
}

export default FullPost;
