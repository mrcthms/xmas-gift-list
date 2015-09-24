import React from 'react';

export var MyView = React.createClass({
  render: function () {
    return (
      <div>Hello World</div>
    );
  }
});

export var AddItemForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var url = React.findDOMNode(this.refs.url).value.trim();
    var cost = React.findDOMNode(this.refs.cost).value.trim();
    if(!url || !cost) {
      return;
    }
    React.findDOMNode(this.refs.url).value = '';
    React.findDOMNode(this.refs.cost).value = '';
    return;
  },
  render: function () {
    return (
      <form className="addItem" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="URL of item" ref="url" />
        <input type="text" placeholder="Cost of item" ref="cost" />
        <input type="submit" value="Add Item" />
      </form>
    );
  }
});