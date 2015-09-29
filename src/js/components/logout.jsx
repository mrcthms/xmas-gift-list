import React from 'react';
import $ from 'jquery';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/api/logout'
    })
      .done((data) => {
        this.setState({
          isLoggedOut: true
        });
      })
      .fail((jqXhr) => {
        console.log(jqXhr);
      });
  }

  componentWillUnmount() {
    // LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <p>{this.state.isLoggedOut === true ? 'Redirecting you back to the login screen' : 'Logging you out'}</p>
      </div>
    );
  }
}

export default Logout;
