import React, {Component} from 'react';

import "./style.scss";
import Post from "../../Components/Post";
import PageHeader from "../../Components/PageHeader";

import {connect} from "react-redux";
import {getPosts} from "../../../Redux/actions"
import CreatePost from "../../Components/CreatePost";

class Posts extends Component {
  componentDidMount() {
    fetch("https://simpleblogapi.herokuapp.com/posts")
      .then(res => {
        return res.json();
      })
      .then(result => this.props.getPosts(result));
  }

  render() {
    const {posts, getPosts} = this.props;
    return (
      <>
        <PageHeader/>
        <div className="posts">
          <div className="container">
            <h1>Posts</h1>
            <div className="posts__content">
              {
                posts.length === 0
                  ? <div>Загрузка...</div>
                  : posts.map(post => <Post key={post.id} {...post}
                                            getPosts={getPosts}/>)
              }
              <CreatePost getPosts={getPosts} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  posts: store.posts,
});

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
