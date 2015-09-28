import React from 'react';
import LoginStore from '../stores/login-store.jsx';
import LoginActions from '../actions/login-actions.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var canSubmit = true;

    var username = this.state.username.trim();
    var password = this.state.password.trim();

    if(!username || !password) {
      canSubmit = false;
    }

    if (!username) {
      LoginActions.invalidUsername();
      this.refs.username.getDOMNode().focus();
    }

    if (!password) {
      LoginActions.invalidPassword();
    }

    if (canSubmit === true) {
      LoginActions.attemptLogin(username, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Log in</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <span className='help-block'>{this.state.helpBlock}</span>
                  <div className={'form-group ' + this.state.usernameValidationState}>
                    <label className='control-label'>Username</label>
                    <input type='text' className='form-control' ref='name' value={this.state.username}
                           onChange={LoginActions.updateUsername} autoFocus/>
                  </div>
                  <div className={'form-group ' + this.state.passwordValidationState}>
                    <label className='control-label'>Password</label>
                    <input type='text' className='form-control' ref='password' value={this.state.password}
                           onChange={LoginActions.updatePassword} />
                  </div>

                  <button type='submit' className='btn btn-primary'>Log In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
