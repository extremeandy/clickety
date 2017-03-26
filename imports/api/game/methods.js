// Methods related to game

import { Meteor } from 'meteor/meteor';
import { Players } from '../players/players.js';
import { GameState } from './game-state.js';

Meteor.methods({
  'game.start'() {
    Players.update({}, { $set: { score: 50 } }, { multi: true });

    let countdown = 5;
    const handle = Meteor.setInterval(() => {
      const description = countdown === 0
        ? "Game in progress"
        : `Game starting in ${countdown} seconds...`;
      const inProgress = countdown === 0;
      GameState.update({}, { $set: { inProgress, description }});
      if (inProgress) {
        Meteor.clearInterval(handle);
      }
      countdown--;
    }, 1000);
  },
  'game.reset'() {
    Players.update({}, { $unset: { score: null } }, { multi: true });

    return GameState.update({}, { $set:
      {
        inProgress: false,
        description: "Waiting for admin to start game"
      }
    });
  }
});
