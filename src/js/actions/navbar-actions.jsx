import $ from 'jquery';
import alt from '../alt.jsx';
import { assign } from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'getCurrentUserSuccess',
      'getCurrentUserFail'
    );
  }


  getCurrentUser() {
    $.ajax({
      url: '/api/current-user'
    })
      .done((data) => {
        this.actions.getCurrentUserSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getCurrentUserFail(jqXhr);
      })
  }
}
export default alt.createActions(NavbarActions);
