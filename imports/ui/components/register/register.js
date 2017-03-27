import './register.html';
import { check } from 'meteor/check';

Template.register.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const username = target.username.value;

    check(username, String);

    event.target.disabled = true;

    Meteor.call('players.insert', username, (error, playerId) => {
      if (error) {
        alert(error.error);
      } else {
        Session.set("currentPlayerId", playerId);
      }
    });
  }
});
