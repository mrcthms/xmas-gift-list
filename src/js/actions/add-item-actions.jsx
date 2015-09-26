import $ from 'jquery';
import alt from '../alt.jsx';

class AddItemActions {
  constructor() {
    this.generateActions(
      'addItemSuccess',
      'addItemFail',
      'updateName',
      'updateUrl',
      'updatePrice',
      'updateIsBought',
      'updateAssignee',
      'updateWhoFor',
      'invalidName',
      'invalidUrl',
      'invalidPrice',
      'invalidIsBought',
      'invalidAssignee',
      'invalidWhoFor'
    );
  }

  addItem(name, url, price, isBought, assignee, whoFor) {
    $.ajax({
      type: 'POST',
      url: '/api/items/',
      data: { name: name, url: url, price: price, isBought: isBought, assignee: assignee, whoFor: whoFor }
    })
      .done((data) => {
        this.actions.addItemSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addItemFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddItemActions);
