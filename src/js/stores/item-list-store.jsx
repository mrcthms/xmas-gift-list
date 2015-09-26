import alt from '../alt.jsx';
import ItemListActions from '../actions/item-list-actions.jsx';

class ItemListStore {
  constructor() {
    this.bindActions(ItemListActions);
    this.items = [];
  }

  onGetItemsSuccess(data) {
    this.items = data;
  }

  onGetItemsFail(jqXhr) {
    console.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ItemListStore);
