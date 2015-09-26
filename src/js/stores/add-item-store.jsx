import alt from '../alt.jsx';
import $ from 'jquery';
import AddItemActions from '../actions/add-item-actions.jsx';

class AddItemStore {
  constructor() {
    this.bindActions(AddItemActions);
    this.name = '';
    this.url = '';
    this.price = '';
    this.isBought = false;
    this.assignee = '';
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
  }

  onAddItemFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
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
    this.isBought = evt.target.value;
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
