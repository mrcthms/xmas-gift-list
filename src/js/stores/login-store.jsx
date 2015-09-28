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
  }

  onLoginSuccess(successMessage) {
    this.usernameValidationState = 'has-success';
    this.helpBlock = 'Logged in successfully';
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

}

export default alt.createStore(LoginStore);
