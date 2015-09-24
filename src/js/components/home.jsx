import React from 'react';
import List from './list.jsx';
import AddItemForm from './add-item-form.jsx';

class Home extends React.Component {
  render() {
    return (
      <div className="xmas-list">
        <List />
        <AddItemForm />
      </div>
    );
  }
};

export default Home;