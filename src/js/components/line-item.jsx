import React from 'react';

export var LineItem = React.createClass({
  render: function () {
    return (
      <div className="line-item">
        <span className="line-item__meta">
          <span className="line-item__title" ref="title">{this.props.title}</span>
          <span className="line-item__price" ref="source">{this.props.source}</span>
        </span>
        <span className="line-item__price" ref="price">{this.props.price}</span>
        <span className="line-item__assignee" ref="assignee">{this.props.assignee}</span>
        <span className="line-item__status" ref="status">{this.props.status}</span>
      </div>
    );
  }
});