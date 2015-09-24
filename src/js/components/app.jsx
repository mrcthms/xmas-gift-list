import React from 'react';
import { AddItemForm } from './add-item-form.jsx';
import { List } from './list.jsx';

export var App = React.createClass({
  render: function () {
    return (
      <div className="xmas-list">
        <List />
        <AddItemForm />
      </div>
    );
  }
});