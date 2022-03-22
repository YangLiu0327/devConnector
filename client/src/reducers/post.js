import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

function postReducer(state = initialState, action){
  const { type, payload } = action;
  switch(type){
    case GET_POSTS:
      // console.log(payload, 'this is for get posts')
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case GET_POST:
      // console.log(payload, 'this is for get post by id')
      return {
        ...state,
        post: payload,
        loading: false
      }
      case ADD_POST:
        // console.log(payload, 'this is for add post')
        return {
          ...state,
          posts: [payload, ...state.posts],
          loading: false
        }
      case DELETE_POST:
        //  payload is a id 
        //  console.log(payload)
        return {
          ...state,
          // filter不会改变原数组，只是过滤
          // 选择出ID不等于我点击的id的post,不就是删掉这条post嘛
          posts: state.posts.filter((post) => post._id !== payload),
          loading: false
        };
      case POST_ERROR:
        console.log(payload, 'this is for error payload')
      return {
        ...state,
        error: payload,
        loading: false
      }
    case UPDATE_LIKES:
      // console.log(state)
      // console.log(payload.id, "payload id")
      // console.log(state.posts, 'this is posts update like')
      return {
        ...state,
        // 判断是不是登录用户点赞，如果是就在like中加上这个用户 posts.like 中
        // 如果不是 post不用变
        posts: state.posts.map(post =>
           post._id === payload.id ? {...post, likes: 
        payload.likes } : post),
        loading: false
      }
      case ADD_COMMENT:
        return {
          ...state,
          post:{...state.post, comments: payload },
          loading: false
        }
      case REMOVE_COMMENT:
        return {
          ...state,
          post: {
            ...state.post, 
            comments: state.post.comments.filter(
              (comment) => comment._id !== payload
          )},
          loading: false
        }
      default:
        return state;
  }
}

export default postReducer;