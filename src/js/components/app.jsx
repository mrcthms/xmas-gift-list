import React from 'react';
import { RouteHandler } from 'react-router';
import Footer from './footer.jsx';
import Navbar from  './navbar.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="xmas-list">
        <Navbar />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
}

export default App;