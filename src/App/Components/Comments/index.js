import React, {Component} from 'react';
import "./style.scss";
import {dataInteraction} from "../fetchs";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.state = {
      value: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    dataInteraction(
      "POST",
      {
        "postId": this.props.id,
        "body": this.textInput.current.value
      },
      "comments",
      () => {
        dataInteraction(
          "GET",
          null,
          `posts/${this.props.id}?_embed=comments`,
          (result) => this.props.getPost(result),
          (error) => console.log(error)
        );
        this.textInput.current.value = '';
      },
    );
  };

  render() {
    const {comments} = this.props;

    return (
      <div className="comments">
        {
          comments && comments.length > 0
            ? comments.map(comment => (
              <div key={comment.id} className="comments__comment">{comment.body}</div>
            ))
            : <div className="comments__temporary-text">{
              comments
                ? "Данный пост еще никто не комментрировал"
                : "Загрузка комментариев"
            }</div>
        }
        <form className="comments__form" onSubmit={this.handleSubmit}>
          <input className="comments__input"
                 required
                 type="text"
                 placeholder="Введите текст комментария"
                 ref={this.textInput}/>
          <button className="comments__button">Отправить</button>
        </form>
      </div>
    );
  }
}

export default Comments;
