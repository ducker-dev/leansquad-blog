import React, {Component} from 'react';
import "./style.scss";
import {Link} from "react-router-dom";
import {dataInteraction} from "../fetchs";

class Post extends Component {
  render() {
    const {id, title, body, getPosts} = this.props;

    return (
      <div className="post">
        <div className="post__del-post"
             onClick={() => {
               dataInteraction(
                 "DELETE",
                 null,
                 `posts/${id}`,
                 () => {
                   dataInteraction(
                     "GET",
                     null,
                     "posts",
                     (result) => getPosts(result),
                     (error) => console.log(error)
                   );
                 },
                 (error) => console.log(error)
               );
             }}
        >
          x
        </div>
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
