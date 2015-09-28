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
    console.error(jqXhr.responseText);
  }

  onUpdateStatusOfItemsSuccess(data) {
    ItemListActions.getItems();
  }

  onUpdateStatusOfItemsFail(jqXhr) {
    console.error(jqXhr.responseText);
  }
}

export default alt.createStore(ItemListStore);
