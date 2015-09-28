import React from 'react';
import ItemList from './item-list.jsx';

class Home extends React.Component {
  render() {
    return (
      <div className="xmas-list">
        <ItemList>
          { this.props.children }
        </ItemList>
      </div>
    );
  }
};

export default Home;