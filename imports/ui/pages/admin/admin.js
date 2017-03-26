import './admin.html';
import '../../components/game/game.js';

// Meteor.subscribe('players.all');
//   Template.App_admin.onCreated(function () {
// });

Template.App_admin.events({
  'click button[name=reset]'(event) {
    event.preventDefault();

    Meteor.call('game.reset');
  },
  'click button[name=start]'(event) {
    event.preventDefault();

    Meteor.call('game.start');
  },
  'click button[name=removeAll]'(event) {
    event.preventDefault();

    Meteor.call('players.removeAll');
  }
});