import React from 'react';
import { LineItem } from './line-item.jsx';

export var List = React.createClass({
  render: function () {
    return (
      <div className="list">
        <LineItem title="Xbox" source="amazon" price="£19.99" assignee="Marc" status="To Buy" />
        <LineItem title="iPhone 6s" source="apple" price="£519.99" assignee="Amy" status="Bought" />
      </div>

    );
  }
});