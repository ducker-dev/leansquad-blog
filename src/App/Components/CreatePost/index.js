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

  getNewPost = async (e) => {
    e.preventDefault();

    let postTitle = this.textInputOne.current.value;
    let postBody = this.textInputTwo.current.value;

    try {
      const newPost = await dataInteraction(
        "POST",
        {"title": postTitle, "body": postBody},
        "posts"
      );
      this.props.getPosts([...this.props.posts, JSON.parse(newPost)]);
      this.setState({openEditing: false});
    } catch (e) {
      console.error(e)
    }

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
            ? <form className="create-post__form"
                    onSubmit={this.getNewPost}>
              <input className="create-post__input"
                     required
                     placeholder="Заголовок поста"
                     ref={this.textInputOne}/>
              <input className="create-post__input"
                     required
                     placeholder="Тело поста"
                     ref={this.textInputTwo}/>
              <button className="create-post__button">
                Добавить пост
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
