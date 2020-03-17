import React, {Component} from 'react';
import "./style.scss";

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

    let options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        "title": this.textInputOne.current.value,
        "body": this.textInputTwo.current.value
      })
    };

    fetch("https://simpleblogapi.herokuapp.com/posts", options)
      .then(response => response.text())
      .then(() => {
        this.textInputOne.current.value = '';
        this.textInputTwo.current.value = '';
        this.setState({openEditing: false});
        fetch("https://simpleblogapi.herokuapp.com/posts")
          .then(res => {
            return res.json();
          })
          .then(result => this.props.getPosts(result));
      })
      .catch(error => console.log('error', error));
  };


  render() {
    const {openEditing} = this.state;

    return (
      <div className="create-post" onClick={() => this.setState({openEditing: true})}>
        {
          openEditing
            ? <form className="create-post__form" onSubmit={this.handleSubmit}>
              <input className="create-post__input" required type="text" placeholder="Заголовок поста" ref={this.textInputOne}/>
              <input className="create-post__input" required type="text" placeholder="Тело поста" ref={this.textInputTwo}/>
              <button className="create-post__button">Создать пост</button>
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
