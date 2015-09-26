import $ from 'jquery';
import { assign } from 'underscore';
import alt from '../alt.jsx';
import ItemActions from '../actions/item-actions.jsx';

class ItemStore {
  constructor() {
    this.bindActions(ItemActions);
    this.itemId = 0;
    this.name = this.url = this.price = this.assignee = this.whoFor = 'TBD';
    this.isBought = false;
  }

  onGetItemSuccess(data) {
    assign(this, data);
    $(document.body).attr('class', 'page--item');
  }

  onGetItemFail(jqXhr) {
    console.error(jqXhr.responseJSON.message);
  }

  onUpdateIsBoughtStatusSuccess(data) {
    assign(this, data);
  }

  onUpdateIsBoughtStatusFail(jqXhr) {
    console.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ItemStore);
