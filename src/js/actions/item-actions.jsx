import $ from 'jquery';
import alt from '../alt.jsx';

class ItemActions {
  constructor() {
    this.generateActions(
      'getItemSuccess',
      'getItemFail',
      'updateIsBoughtStatusSuccess',
      'updateIsBoughtStatusFail'
    );
  }

  getItem(itemId) {
    $.ajax({
      url: '/api/items/' + itemId,
      type: 'GET'
    })
      .done((data) => {
        this.actions.getItemSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getItemFail(jqXhr);
      });
  }

  updateIsBoughtStatus(isBought, itemId) {
    $.ajax({
      url: '/api/items/' + itemId + '/isBought',
      type: 'PUT',
      data: { isBought: isBought }
    })
      .done((data) => {
        this.actions.updateIsBoughtStatusSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.updateIsBoughtStatusFail(jqXhr);
      });
  }
}

export default alt.createActions(ItemActions);
