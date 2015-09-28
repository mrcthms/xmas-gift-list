import React from 'react';
import { Link } from 'react-router';
import { isEqual } from 'underscore';
import LineItem from './line-item.jsx';
import ItemListStore from '../stores/item-list-store.jsx';
import ItemListActions from '../actions/item-list-actions.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = ItemListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ItemListStore.listen(this.onChange);
    ItemListActions.getItems();
  }

  componentWillUnmount() {
    ItemListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      ItemListActions.getItems(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  handleBoughtStatusChange(id, newIsBought) {
    ItemListActions.updateStatusOfItem(id, newIsBought);
  }

  render() {
    var itemsList = this.state.items.map((item) => {
      return (
        <LineItem {...item} key={ item._id } onBoughtStatusChange={this.handleBoughtStatusChange.bind(this)} />
      );
    }) || [];

    return (
      <div className='container'>
        <div className='list-group'>
          {itemsList}
        </div>
      </div>
    );
  }
}

ItemList.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ItemList;