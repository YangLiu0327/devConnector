import axios from 'axios';

// store jwt in local stroage and 
// set axios headers if we do not have a token 
const setAuthToken = token => {
  if(token){
    // set global header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;
