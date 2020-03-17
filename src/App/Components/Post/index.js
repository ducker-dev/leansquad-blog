import React, {Component} from 'react';
import "./style.scss";
import {Link} from "react-router-dom";

class Post extends Component {
  render() {
    const {id, title, body, getPosts} = this.props;
    console.log(getPosts);

    function delPost(id) {
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
      };
      fetch(`https://simpleblogapi.herokuapp.com/posts/${id}`, params)
        .then(response => response.text())
        .then(() => {
          fetch("https://simpleblogapi.herokuapp.com/posts")
            .then(res => {
              return res.json();
            })
            .then(result => getPosts(result));
        })
        .catch(error => console.log('error', error));
    }

    return (
      <div className="post">
        <div className="post__del-post" onClick={() => delPost(id)}>x</div>
        <Link to={"/view-post/" + id} className="post__link">
          <div className="post__title">
            {title || 'Вы не передали заголовок поста'}
          </div>
          <div className="post__body">
            {body || 'Вы не передали тело поста'}
          </div>
        </Link>
      </div>
    );
  }
}

export default Post;
