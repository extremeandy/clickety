import { Players } from '/imports/api/players/players.js';
import { GameState } from '/imports/api/game/game-state.js';
import { Meteor } from 'meteor/meteor';
import './game.html';

Template.game.helpers({
  players() {
    let players = Players.find({}).fetch();
    let gameState = GameState.findOne();
    return players.map(p => {
      return _.extend(p, {
        showScore: p.score != null,
        disableAttack: !gameState.inProgress || p.score <= 0 // || p._id === Session.get("currentPlayerId")
      });
    });
  },
  gameState() {
    return GameState.findOne();
  }
});

Template.game.events({
  'click button'(event) {
    const playerId = event.target.value;
    Meteor.call("players.attack", playerId);
  }
});