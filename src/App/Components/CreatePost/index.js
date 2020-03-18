import React, {Component} from 'react';
import "./style.scss";
import {dataInteraction} from "../fetchs";

class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.textInputOne = React.createRef();
    this.textInputTwo = React.createRef();
    this.state = {
      openEditing: false,
      inputValueOne: '',
      inputValueTwo: ''
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
      () => {
        dataInteraction(
          "GET",
          null,
          "posts",
          (result) => this.props.getPosts(result),
          (error) => console.log(error)
        );
        postTitle = '';
        postBody = '';
        this.setState({openEditing: false});
      },
    );
  };


  render() {
    const {openEditing} = this.state;

    return (
      <div className="create-post" onClick={() => this.setState({openEditing: true})}>
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
