import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: {posts}}) => {
  
  useEffect(()=>{
    getPosts();
  }, [getPosts]);
  // console.log(posts,"this is for posts from reducer array====")
  console.log(posts, "this is posts from reducer post")
  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        Welcome to the community
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map((post)=>(
           //把posts中的数据传入子组件中
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};


Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
})
export default connect(mapStateToProps, { getPosts })(Posts);
