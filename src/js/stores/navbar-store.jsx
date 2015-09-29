import alt from '../alt.jsx';
import NavbarActions from '../actions/navbar-actions.jsx';
import LoginActions from '../actions/login-actions.jsx';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    this.loggedIn = LoginActions.isLoggedIn();
  }

  onGetCurrentUserSuccess(payload) {
    console.log(data);
  }

  onGetCurrentUserFail(jqXhr) {
    console.log(jqXhr);
  }
}

export default alt.createStore(NavbarStore);
