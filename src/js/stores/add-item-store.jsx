import alt from '../alt.jsx';
import $ from 'jquery';
import React from 'react';
import AddItemActions from '../actions/add-item-actions.jsx';

class AddItemStore {
  constructor() {
    this.bindActions(AddItemActions);
    this.name = '';
    this.url = '';
    this.price = '';
    this.isBought = false;
    this.assignee = '';
    this.whoFor = '';
    this.helpBlock = '';
    this.nameValidationState = '';
    this.urlValidationState = '';
    this.priceValidationState = '';
    this.isBoughtValidationState = '';
    this.assigneeValidationState = '';
    this.whoForValidationState = '';
  }

  onAddItemSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
    this.isBought = this.isBought === true ? 'Yes' : 'No';
  }

  onAddItemFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onClearFields(refs) {
    var fields = ['name', 'url', 'price', 'isBought', 'assignee', 'whoFor'];
    fields.forEach((field) => {
      React.findDOMNode(refs[field]).value = '';
      if(field === 'isBought') {
        this[field] = false;
      } else {
        this[field] = '';
      }
    });
  }

  onUpdateName(evt) {
    this.name = evt.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onUpdateUrl(evt) {
    this.url = evt.target.value;
    this.urlValidationState = '';
  }

  onUpdatePrice(evt) {
    this.price = evt.target.value;
    this.priceValidationState = '';
  }

  onUpdateIsBought(evt) {
    this.isBought = evt.target.value === true ? 'Yes' : 'No';
    this.isBoughtValidationState = '';
  }

  onUpdateAssignee(evt) {
    this.assignee = evt.target.value;
    this.assigneeValidationState = '';
  }

  onUpdateWhoFor(evt) {
    this.whoFor = evt.target.value;
    this.whoForValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a character name.';
  }

  onInvalidUrl() {
    this.urlValidationState = 'has-error';
  }

  onInvalidPrice() {
    this.priceValidationState = 'has-error';
  }

  onInvalidIsBought() {
    this.isBoughtValidationState = 'has-error';
  }

  onInvalidAssignee() {
    this.assigneeValidationState = 'has-error';
  }

  onInvalidWhoFor() {
    this.whoForValidationState = 'has-error';
  }
}

export default alt.createStore(AddItemStore);
