import React from 'react';
import AddItemStore from '../stores/add-item-store.jsx';
import AddItemActions from '../actions/add-item-actions.jsx';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddItemStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddItemStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddItemStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var canSubmit = true;

    var name = this.state.name.trim();
    var url = this.state.url.trim();
    var price = this.state.price.trim();
    var isBought = this.state.isBought;
    var assignee = this.state.assignee.trim();
    var whoFor = this.state.whoFor.trim();

    if(!name || !url || !price || typeof isBought === 'undefined' || !assignee || !whoFor) {
      canSubmit = false;
    }

    if (!name) {
      AddItemActions.invalidName();
      this.refs.name.getDOMNode().focus();
    }

    if (!url) {
      AddItemActions.invalidUrl();
    }

    if (!price) {
      AddItemActions.invalidPrice();
    }

    if (typeof isBought === 'undefined') {
      AddItemActions.invalidIsBought();
    }

    if (!assignee) {
      AddItemActions.invalidAssignee();
    }

    if (!whoFor) {
      AddItemActions.invalidWhoFor();
    }

    if (canSubmit === true) {
      AddItemActions.addItem(name, url, price, isBought, assignee, whoFor, this.refs);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Item</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <span className='help-block'>{this.state.helpBlock}</span>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Item Name</label>
                    <input type='text' className='form-control' ref='name' value={this.state.name}
                           onChange={AddItemActions.updateName} autoFocus/>
                  </div>
                  <div className={'form-group ' + this.state.urlValidationState}>
                    <label className='control-label'>Item URL</label>
                    <input type='text' className='form-control' ref='url' value={this.state.url}
                           onChange={AddItemActions.updateUrl} />
                  </div>
                  <div className={'form-group ' + this.state.priceValidationState}>
                    <label className='control-label'>Item Price</label>
                    <input type='text' className='form-control' ref='price' value={this.state.price}
                           onChange={AddItemActions.updatePrice} />
                  </div>
                  <div className={'form-group ' + this.state.whoForValidationState}>
                    <label className='control-label'>Who For?</label>
                    <input type='text' className='form-control' ref='whoFor' value={this.state.whoFor}
                           onChange={AddItemActions.updateWhoFor} />
                  </div>
                  <div className={'form-group ' + this.state.assigneeValidationState}>
                    <label className='control-label'>Item Assignee</label>
                    <input type='text' className='form-control' ref='assignee' value={this.state.assignee}
                           onChange={AddItemActions.updateAssignee} />
                  </div>
                  <div className={'form-group ' + this.state.isBoughtValidationState}>
                    <label className='control-label'>Item Status</label>
                    <div className='checkbox'>
                      <label>
                        <input type='checkbox' className='form-control' ref='isBought'
                           onChange={AddItemActions.updateIsBought} /> Bought?
                      </label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
