import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';


// post 从父组件传来 object
// auth 从state中拿来
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth, 
  post,
  // post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) =>

(
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${post.user}`}>
        <img className="round-img" src={post.avatar} alt="" />
        <h4>{post.name}</h4>
      </Link>
      {console.log(post, "this is post from parent component")}
    </div>
    <div>
      <p className="my-1">{post.text}</p>
      <p className="post-date">Posted on {formatDate(post.date)}</p>
      {showActions && <Fragment>
        <button
          onClick={() => addLike(post._id)}
          type="button" className='btn btn-light'>
          <i className='fas fa-thumbs-up'  />{' '}
          <span>{post.likes.length > 0 && <span>{post.likes.length}</span>}</span>
        </button>
        <button
          onClick={() => removeLike(post._id)}
          type='button' className='btn btn-light'>
          <i className='fas fa-thumbs-down' />
        </button>
        <Link to={`/posts/${post._id}`} className='btn btn-primary'>
          Discussion{' '}
          {post.comments.length > 0 && (
            <span className='comment-count'>{post.comments.length}</span>
          )}
        </Link>
        {!auth.loading && post.user === auth.user._id && (
          <button
            onClick={() => deletePost(post._id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </Fragment>}
    </div>
  </div>
);


PostItem.defaultProps ={
  showActions: true
}
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});




export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
