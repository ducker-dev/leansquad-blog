import React, {Component} from 'react';
import {Link} from "react-router-dom";
import classNames from "classnames";

import "./style.scss";
import {dataInteraction} from "../fetchs";

class Post extends Component {

  constructor(props) {
    super(props);

    this.textInputOne = React.createRef();
    this.textInputTwo = React.createRef();
    this.postRef = React.createRef();
    this.state = {
      change: false,
      showOption: false
    }
  }

  changePost = async (e) => {
    e.preventDefault();

    let postTitle = this.textInputOne.current.value;
    let postBody = this.textInputTwo.current.value;

    try {
      const modifiedPost = await dataInteraction(
        "PUT",
        { "title": postTitle, "body": postBody },
        `posts/${this.props.id}`
      );
      const {title, body, id} = JSON.parse(modifiedPost);
      let oldPosts = [...this.props.posts];

      if (id) {
        this.props.getPosts(oldPosts.map(item => {
          if(+item.id === +id)
            return {...item, title, body};
          else
            return {...item};
        }));
        this.setState({change: false, showOption: false});
        this.removeListeners();
      } else {
        alert('Пост, который вы пытались изменить, был удален другим пользователем');
        const newPosts = oldPosts.filter(post => post.id !== this.props.id);
        this.props.getPosts(newPosts)
      }
    } catch (e) {
      console.error(e)
    }
  };

  deletePost = async () => {
    try {
      await dataInteraction(
        "DELETE",
        null,
        `posts/${this.props.id}`
      );
      let oldPosts = [...this.props.posts];
      this.props.getPosts(oldPosts.filter(post => post.id !== this.props.id));
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
    if (!this.postRef.current.contains(e.target)) {
      this.setState({change: false, showOption: false});
      this.removeListeners();
    }
  };

  handleKeyUp = e => {
    if (e.keyCode === 27) {
      this.setState({change: false, showOption: false});
      this.removeListeners();
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.showOption && !prevState.showOption) {
      this.addListeners();
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  render() {
    const {id, title, body} = this.props;

    return (
      <div className="post" ref={this.postRef}>
        {
          this.state.change
            ? <div className="post__wrapper-form">
              <form className="post__change-form"
                    onSubmit={this.changePost}>
                <input className="post__input"
                       required
                       defaultValue={title}
                       ref={this.textInputOne}/>
                <input className="post__input"
                       required
                       defaultValue={body}
                       ref={this.textInputTwo}/>
                <button className="post__button">
                  Изменить пост
                </button>
              </form>
            </div>
            : <Link to={"/view-post/" + id} className="post__link">
              <div className="post__title">
                {title || 'Вы не передали заголовок поста'}
              </div>
              <div className="post__body">
                {body || 'Вы не передали тело поста'}
              </div>
            </Link>
        }
        {
          !this.state.showOption && (
            <button className="post__show-option"
                    onClick={() => this.setState({showOption: true})}>
              ...
            </button>
          )
        }
        {
          this.state.showOption && <>
            <button className={classNames(
              "post__del-post",
              {"post__del-post_visible": this.state.change}
            )}
                    onClick={() => this.deletePost()}
            >
              <svg width="12" height="15" viewBox="0 0 12 15" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.31213 14.2766C1.32906 14.6809 1.66176 15 2.06635 15H9.11356C9.51815 15 9.85085 14.6809 9.86778 14.2766L10.371 3.65259H0.808868L1.31213 14.2766ZM7.18412 6.29141C7.18412 6.12213 7.32138 5.98483 7.49074 5.98483H7.98115C8.1504 5.98483 8.28777 6.12209 8.28777 6.29141V12.3612C8.28777 12.5305 8.15051 12.6678 7.98115 12.6678H7.49074C7.32145 12.6678 7.18412 12.5306 7.18412 12.3612V6.29141ZM5.03816 6.29141C5.03816 6.12213 5.17543 5.98483 5.34475 5.98483H5.83516C6.00441 5.98483 6.14175 6.12209 6.14175 6.29141V12.3612C6.14175 12.5305 6.00452 12.6678 5.83516 12.6678H5.34475C5.17546 12.6678 5.03816 12.5306 5.03816 12.3612V6.29141ZM2.89214 6.29141C2.89214 6.12213 3.0294 5.98483 3.19872 5.98483H3.68917C3.85846 5.98483 3.99576 6.12209 3.99576 6.29141V12.3612C3.99576 12.5305 3.85849 12.6678 3.68917 12.6678H3.19872C3.02944 12.6678 2.89214 12.5306 2.89214 12.3612V6.29141Z"/>
                <path
                  d="M10.7061 0.772725H7.455V0.158085C7.455 0.0707985 7.38424 0 7.29691 0H3.8829C3.79562 0 3.72485 0.0707985 3.72485 0.158085V0.772688H0.473704C0.212065 0.772688 0 0.98479 0 1.24643V2.73463H11.1798V1.24647C11.1798 0.984827 10.9677 0.772725 10.7061 0.772725Z"/>
              </svg>
            </button>
            <button className={classNames(
              "post__change-post",
              {"post__change-post_visible": this.state.change}
            )}
                    onClick={() => this.setState({change: !this.state.change})}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.93517 9.78157L1.39876 7.24575L7.5335 1.11245L10.0699 3.64826L3.93517 9.78157ZM1.16168 7.69244L3.48838 10.0186L0 11.18L1.16168 7.69244ZM10.85 2.87166L10.4101 3.3115L7.87034 0.772334L8.31028 0.332496C8.75344 -0.110832 9.47209 -0.110832 9.91525 0.332496L10.85 1.26707C11.29 1.7116 11.29 2.42726 10.85 2.87166Z"
                  fill="black"/>
              </svg>
            </button>
          </>
        }
      </div>
    );
  }
}

export default Post;
