import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentList: []}

  onClickDeleteComment = id => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(eachComment => eachComment.id !== id),
    })
  }

  onClickLikeToggle = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentList = () => {
    const {commentList} = this.state
    return commentList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        id={eachComment.id}
        onClickLikeToggle={this.onClickLikeToggle}
        onClickDeleteComment={this.onClickDeleteComment}
      />
    ))
  }

  onSubmitComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeInputElement = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeTextAreaInput = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    return (
      <div className="main-container">
        <h1 className="section-heading">Comments</h1>
        <div className="app-container">
          <form
            className="comment-addition-elements-container"
            onSubmit={this.onSubmitComment}
          >
            <p className="comment-section-description">
              Say something about 4.0 Technologies
            </p>
            <input
              type="text"
              className="text-type-input"
              placeholder="Your Name"
              value={nameInput}
              onChange={this.onChangeInputElement}
            />
            <textarea
              rows="5"
              cols="50"
              placeholder="Your Comment"
              className="textarea-comment-description"
              value={commentInput}
              onChange={this.onChangeTextAreaInput}
            />
            <button className="Add-comment-button" type="submit">
              Add Comments
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comments-image"
          />
        </div>
        <hr className="separator" />
        <p className="comments-tagline">
          <span className="comments-count">{commentList.length}</span> Comments
        </p>

        <ul className="comments-section">{this.renderCommentList()}</ul>
      </div>
    )
  }
}

export default Comments
