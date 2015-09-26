import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h3 className='lead'><strong>Information</strong> and <strong>Copyright</strong></h3>
              <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with Flux architecture and server-side rendering.</p>
              <p>You may view the <a href='https://github.com/sahat/newedenfaces-react'>Source Code</a> behind this project on GitHub.</p>
              <p>© 2015 Sahat Yalkabov.</p>
              <Link to='/add'>Add</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;