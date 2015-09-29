import alt from '../alt.jsx';
import $ from 'jquery';
import React from 'react';
import LoginActions from '../actions/login-actions.jsx';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.username = '';
    this.password = '';
    this.helpBlock = '';
    this.usernameValidationState = '';
    this.passwordValidationState = '';
    this.loggedInUser = null;
  }

  onLoginSuccess(data) {
    this.usernameValidationState = 'has-success';
    this.helpBlock = `Logged in successfully as ${data.message.username}`;
    localStorage.setItem('token', data.message._id);
    this.loggedInUser = data.message;
  }

  onloginFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'There was an issue. Please try again';
  }

  onUpdateUsername(evt) {
    this.username = evt.target.value;
    this.usernameValidationState = '';
    this.helpBlock = '';
  }

  onUpdatePassword(evt) {
    this.password = evt.target.value;
    this.passwordValidationState = '';
  }

  onInvalidUsername() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a character name.';
  }

  onInvalidPassword() {
    this.urlValidationState = 'has-error';
    this.helpBlock = 'Please also enter a password';
  }

  onIsLoggedIn() {
    return !!this.loggedInUser;
  }

}

export default alt.createStore(LoginStore);
