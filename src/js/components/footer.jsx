import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col'>

              <Link to='/add'>Add</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;