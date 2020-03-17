import React, {Component} from 'react';
import "./style.scss";

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

    let options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        "postId": this.props.id,
        "body": this.textInput.current.value
      })
    };

    fetch("https://simpleblogapi.herokuapp.com/comments", options)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        this.textInput.current.value = '';
        fetch(`https://simpleblogapi.herokuapp.com/posts/${this.props.id}?_embed=comments`)
          .then(res => {
            return res.json();
          })
          .then(result => this.props.getPost(result));
      })
      .catch(error => console.log('error', error));
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
