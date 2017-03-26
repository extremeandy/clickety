import './register.html';

Template.register.events({
  'submit form'(event, instance) {
    event.preventDefault();

    const target = event.target;
    const username = target.username.value;

    Meteor.call('players.insert', username, (error, playerId) => {
      if (error) {
        alert(error.error);
      } else {
        Session.set("currentPlayerId", playerId);
      }
    });
  }
});
