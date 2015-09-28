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
      'invalidPassword'
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
        //Router.Navigation.transitionTo('/');
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseText);
      });
  }
}

export default alt.createActions(LoginActions);
