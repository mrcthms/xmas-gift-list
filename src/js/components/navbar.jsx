import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import NavbarStore from '../stores/navbar-store.jsx';
import NavbarActions from '../actions/navbar-actions.jsx';
import LoginStore from '../stores/login-store.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange)
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var loggedInOrOut = this.state.loggedIn ?
      <li><Link to='/logout'>Logout</Link></li> :
      <li><Link to='/login'>Login</Link></li>;
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <ul className='nav navbar-nav'>
          <li><Link to='/'>Home</Link></li>
          {loggedInOrOut}
          <li>{'No current user'}</li>
        </ul>
      </nav>
    );
  }
}
Navbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Navbar;