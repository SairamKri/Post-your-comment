// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onClickLikeToggle, onClickDeleteComment} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const postedTime = formatDistanceToNow(date)
  const toSelectTheLikeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLikeButton = () => {
    onClickLikeToggle(id)
  }

  const onClickDeleteButton = () => {
    onClickDeleteComment(id)
  }

  return (
    <li className="list-item">
      <div className="display-picture-name-time-container">
        <div className={initialClassName}>
          <p className="display-image-text">{initial}</p>
        </div>
        <h1 className="user-name">{name}</h1>
        <p className="upload-time">{postedTime} ago</p>
      </div>
      <p className="comment-text">{comment}</p>
      <div className="like-delete-container">
        <div className="liked-container">
          <button
            className="like-button"
            type="button"
            onClick={onClickLikeButton}
          >
            <img
              src={toSelectTheLikeImage}
              alt="like"
              className="liked-image"
              id="liked"
            />
          </button>
          <label htmlFor="liked">Like</label>
        </div>
        <button
          className="delete-image"
          type="button"
          onClick={onClickDeleteButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-button"
            alt="delete"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}

export default CommentItem
