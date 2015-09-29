import $ from 'jquery';
import LoginActions from '../actions/login-actions.jsx';

class Auth {
  constructor(props) {
    super(props);
  }

  logout() {
    LoginActions.logoutUser();
  }

  getToken() {
    return localStorage.token;
  }

  isLoggedIn() {
    return !!localStorage.token;
  }
}

export default Auth;