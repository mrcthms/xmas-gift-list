import $ from 'jquery';
import alt from '../alt.jsx';

class LoginActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'updateUsername',
      'updatePassword',
      'invalidUsername',
      'invalidPassword',
      'isLoggedIn'
    );
  }

  attemptLogin(username, password) {
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: { username: username, password: password }
    })
      .done((data) => {
        this.actions.loginSuccess(data);
        this.actions.isLoggedIn();
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseText);
      });
  }

  logoutUser() {
    localStorage.removeItem('token');
  }
}

export default alt.createActions(LoginActions);
