import React, {Component} from 'react';
import PageHeader from "../../Components/PageHeader";
import "./style.scss";

import {connect} from "react-redux";
import {getPost} from "../../../Redux/actions"
import Comments from "../../Components/Comments";

class ViewPost extends Component {
  componentDidMount() {
    const id = this.props.match.params.id || "";

    fetch(`https://simpleblogapi.herokuapp.com/posts/${id}?_embed=comments`)
      .then(res => {
        return res.json();
      })
      .then(result => this.props.getPost(result));
  }

  componentWillUnmount() {
    this.props.getPost({})
  }

  render() {
    const {post, getPost} = this.props;
    return (
      <>
        <PageHeader/>
        <div className="view-post">
          <div className="container">
            <h1>View post</h1>
            {
              !post.title && !post.body
                ? <div>Загрузка информации о посте...</div>
                : <div className="view-post__content">
                  <div className="view-post__title">{post.title}</div>
                  <div>{post.body}</div>
                </div>
            }
            <h1>Comments</h1>
            <Comments {...post} getPost={getPost}/>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  post: store.post,
});

const mapDispatchToProps = {
  getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
