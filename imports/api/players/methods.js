// Methods related to players

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Players } from './players.js';
import { GameState } from '../game/game-state.js';

Meteor.methods({
  'players.insert'(username) {
    check(username, String);

    return Players.insert({
      username,
      createdAt: new Date(),
    });
  },
  'players.removeAll'() {
    Players.remove({});
  },
  'players.attack'(playerIdToAttack, attackingPlayerId) {
    const attackingPlayer = Players.findOne({ _id: attackingPlayerId });
    if (attackingPlayer.score === 0) {
      // Attacking player must be alive to attack others!
      return;
    }
    const playerToAttack = Players.findOne({ _id: playerIdToAttack });
    const newScore = Math.max(playerToAttack.score - 1, 0);
    Players.update({ _id: playerIdToAttack}, { $set: { score: newScore }});
    if (newScore === 0) {
      // How many players remaining with a score more than zero?
      const remainingPlayers = Players.find({ score: { $gt: 0 } });
      if (remainingPlayers.count() === 1) {
        const winningPlayer = remainingPlayers.fetch()[0];
        GameState.update({}, { $set: { inProgress: false, description: `GAME OVER! Winner is: ${winningPlayer.username}` }});
      }
    }
  }
});
