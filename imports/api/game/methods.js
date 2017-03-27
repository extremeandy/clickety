// Methods related to game

import { Meteor } from 'meteor/meteor';
import { Players } from '../players/players.js';
import { GameState } from './game-state.js';
import { GameConfiguration } from './configuration.js';

let countdownHandle = null;

Meteor.methods({
  'game.start'() {
    Meteor.clearInterval(countdownHandle);

    Players.update({}, {
      $set: {
        score: GameConfiguration.InitialPoints,
        attacks: 0
      }
    }, {
      multi: true
    });

    let countdown = 5;
    countdownHandle = Meteor.setInterval(() => {
      const description = countdown === 0
        ? "<h2>Game in progress</h2>"
        : `<h2>Game starting in ${countdown} seconds...</h2>`;
      const inProgress = countdown === 0;
      GameState.update({}, {
        $set: {
          inProgress,
          description,
          startedAt: new Date()
        }
      });
      if (inProgress) {
        Meteor.clearInterval(countdownHandle);
      }
      countdown--;
    }, 1000);
  },
  'game.reset'() {
    Meteor.clearInterval(countdownHandle);

    Players.update({}, { $unset: { score: null, attacks: null } }, { multi: true });

    return GameState.update({}, { $set:
      {
        inProgress: false,
        description: "<h2>Waiting for admin to start game</h2>"
      }
    });
  }
});
