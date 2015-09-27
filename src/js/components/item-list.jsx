import React from 'react';
import { Link } from 'react-router';
import { isEqual } from 'underscore';
import Item from './item.jsx';
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
    ItemListActions.getItems(this.props.params);
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
    console.log(state);
    this.setState(state);
  }

  render() {
    console.log(this.state);
    var itemsList = this.state.items.map((item) => {
      return (
        <Item key={ item._id } />
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