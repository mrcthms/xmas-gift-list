import $ from 'jquery';
import alt from '../alt.jsx';

class ItemListActions {
  constructor() {
    this.generateActions(
      'getItemsSuccess',
      'getItemsFail'
    );
  }

  getItems(payload) {
    var url = '/api/items';
    $.ajax({
      url: url
    })
      .done((data) => {
        this.actions.getItemsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getItemsFail(jqXhr);
      });
  }
}

export default alt.createActions(ItemListActions);
