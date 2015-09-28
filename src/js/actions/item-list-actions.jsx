import $ from 'jquery';
import alt from '../alt.jsx';

class ItemListActions {
  constructor() {
    this.generateActions(
      'getItemsSuccess',
      'getItemsFail',
      'updateStatusOfItemsSuccess',
      'updateStatusOfItemsFail'
    );
  }

  getItems() {
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

  updateStatusOfItem(id, newIsBought) {
    $.ajax({
      url: '/api/items/' + id + '/isBought',
      type: 'PUT',
      data: { isBought: newIsBought }
    })
      .done((data) => {
        this.actions.updateStatusOfItemsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.updateStatusOfItemsFail(jqXhr);
      });
  }
}

export default alt.createActions(ItemListActions);
