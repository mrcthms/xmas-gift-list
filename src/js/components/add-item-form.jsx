import React from 'react';

export var AddItemForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var url = React.findDOMNode(this.refs.url).value.trim();
    var cost = React.findDOMNode(this.refs.price).value.trim();
    if(!url || !price) {
      return;
    }
    React.findDOMNode(this.refs.url).value = '';
    React.findDOMNode(this.refs.price).value = '';
    return;
  },
  render: function () {
    return (
      <form className="add-item" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="URL of item" ref="url" />
        <input type="text" placeholder="Cost of item" ref="price" />
        <input type="text" placeholder="Assignee" ref="assignee" />
        <input type="text" placeholder="Status" ref="status" />
        <input type="submit" value="Add Item" />
      </form>
    );
  }
});