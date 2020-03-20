import React, {Component} from 'react';

import "./style.scss";
import PageHeader from "../../Components/PageHeader";
import Post from "../../Components/Post";
import CreatePost from "../../Components/CreatePost";

import {connect} from "react-redux";
import {getPosts} from "../../../Redux/actions";
import {dataInteraction} from "../../Components/fetchs"

class Posts extends Component {

  /**
   * @method getDataPosts
   * @return {void}
   */
  getPosts = async () => {
    try {
      const posts = await dataInteraction(
        "GET",
        null,
        "posts"
      );
      this.props.getPosts(posts);
    } catch (e) {
      console.error(e);
    }
  };

  componentDidMount() {
    this.getPosts();
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
                posts && posts.length > 0
                  ? posts.map(post => (
                    <Post key={post.id} {...post}
                          posts={posts}
                          getPosts={getPosts}/>
                  ))
                  : <div>Загрузка...</div>
              }
              <CreatePost getPosts={getPosts} posts={posts}/>
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
