import React, {Component} from 'react';
import "./style.scss";
import {dataInteraction} from "../fetchs";

class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.textInputOne = React.createRef();
    this.textInputTwo = React.createRef();
    this.createPostRef = React.createRef();
    this.state = {
      openEditing: false
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    let postTitle = this.textInputOne.current.value;
    let postBody = this.textInputTwo.current.value;

    dataInteraction(
      "POST",
      {
        "title": postTitle,
        "body": postBody
      },
      "posts",
      (result) => {
        console.log(this.props.posts);
        let updatedPosts = this.props.posts.slice();
        updatedPosts.push(JSON.parse(result));
        this.props.getPosts(updatedPosts);

        postTitle = '';
        postBody = '';
        this.setState({openEditing: false});
      },
      error => {
        console.log(error);
      }
    );
  };

  removeListeners = () => {
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleKeyUp);
  };

  addListeners = () => {
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("keydown", this.handleKeyUp);
  };

  handleClickOutside = e => {
    if (!this.createPostRef.current.contains(e.target)) {
      this.setState({openEditing: false});
      this.removeListeners();
    }
  };

  handleKeyUp = e => {
    if (e.keyCode === 27) {
      this.setState({openEditing: false});
      this.removeListeners();
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.openEditing && !prevState.openEditing) {
      this.addListeners();
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  render() {
    const {openEditing} = this.state;
    return (
      <div className="create-post"
           ref={this.createPostRef}
           onClick={() => this.setState({openEditing: true})}>
        {
          openEditing
            ? <form className="create-post__form" onSubmit={this.handleSubmit}>
              <input className="create-post__input"
                     required
                     type="text"
                     placeholder="Заголовок поста"
                     ref={this.textInputOne}/>
              <input className="create-post__input"
                     required
                     type="text"
                     placeholder="Тело поста"
                     ref={this.textInputTwo}/>
              <button className="create-post__button">
                Создать пост
              </button>
            </form>
            : <div className="create-post__plus">
              Создать новый пост
            </div>
        }
      </div>
    );
  }
}

export default CreatePost;
