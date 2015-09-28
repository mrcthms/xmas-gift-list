import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import NavbarStore from '../stores/navbar-store.jsx';
import NavbarActions from '../actions/navbar-actions.jsx';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange)
    NavbarActions.getCharacterCount();

    var socket = io.connect();

    socket.on('onlineUsers', (data) => {
      NavbarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    var searchQuery = this.state.searchQuery.trim();
    if (searchQuery) {
      NavbarActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm.getDOMNode(),
        router: this.context.router
      });
    }
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <ul className='nav navbar-nav'>
          <li><Link to='/'>Home</Link></li>
        </ul>
      </nav>
    );
  }
}
Navbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Navbar;