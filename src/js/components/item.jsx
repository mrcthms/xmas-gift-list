import $ from 'jquery';
import React from 'react';
import ItemStore from '../stores/item-store.jsx';
import ItemActions from '../actions/item-actions.jsx';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = ItemStore.getState();
    this.onChange = this.onChange.bind(this);
    // this.id = this.props.id;
    // if (this.props.params && this.props.params.id) {
    //   this.id = this.props.params.id;
    // }
    if (!this.props.params && this.props.id) {
      this.props.params = {};
      this.props.params.id = this.props.id;
    }
  }

  componentDidMount() {
    ItemStore.listen(this.onChange);
    ItemActions.getItem(this.props.params.id);
  }

  componentWillUnmount() {
    ItemStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      ItemActions.getItem(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  handleIsBoughtClick(evt) {
    evt.preventDefault();
    ItemActions.updateIsBoughtStatus(this.state.isBought, this.props.params.id);
  }

  render () {
    return (
      <div className='line-item'>
        <span className='line-item__meta'>
          <span className='line-item__title' ref='name'>
            <span className='line-item__label'>Name</span>
            <span className='line-item__value'>{this.state.name}</span>
          </span>
          <span className='line-item__price' ref='url'>
            <span className='line-item__label'>Url</span>
            <span className='line-item__value'>{this.state.url}</span>
          </span>
        </span>
        <span className='line-item__price' ref='price'>
          <span className='line-item__label'>Price</span>
          <span className='line-item__value'>{this.state.price}</span>
        </span>
        <span className='line-item__assignee' ref='assignee'>
          <span className='line-item__label'>Who is buying?</span>
          <span className='line-item__value'>{this.state.assignee}</span>
        </span>
        <span className='line-item__who-for' ref='whoFor'>
          <span className='line-item__label'>Who is the recipient?</span>
          <span className='line-item__value'>{this.state.whoFor}</span>
        </span>
        <span className='line-item__status' ref='isBought' onClick={this.handleIsBoughtClick.bind(this)}>
          <span className='line-item__label'>Is it bought?</span>
          <span className='line-item__value'>{this.state.isBought}</span>
        </span>
      </div>
    );
  }
}

Item.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Item;
