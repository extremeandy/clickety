import { Players } from '/imports/api/players/players.js';
import { GameState } from '/imports/api/game/game-state.js';
import { GameConfiguration } from '/imports/api/game/configuration.js';
import { SoundFx } from '/imports/ui/lib/sound-fx.js';
import { Meteor } from 'meteor/meteor';
import './game.html';

// Template.game.onCreated(function() {
//   this.currentPlayerWatchHandle = this.autorun(() => {
//     const currentPlayerId = Session.get('currentPlayerId');
//     const currentPlayer = Players.findOne({ _id: currentPlayerId });
//     if (currentPlayer != null && currentPlayer.score === 0) {
//       // Allow the rest of the UI to update before we block with an alert
//       Meteor.defer(() => {
//         alert("You're out! :(");
//       });
//     }
//   });
// });

let randomNumbers = [];

Template.game.helpers({
  players() {
    const currentPlayerId = Session.get('currentPlayerId');
    let players = Players.find().fetch();

    // Only change the randomize order if the number of players changes.
    if (randomNumbers.length !== players.length) {
      randomNumbers = players.map(p => Math.random());
    }

    players = players
      .randomize(randomNumbers)
      .sort((a, b) => +(a._id === currentPlayerId) - +(b._id === currentPlayerId));

    const gameState = GameState.findOne();
    return players.map(p => {
      let buttonClass;
      if (p.score == null) {
        buttonClass = "btn";
      } else if (p.score === 0) {
        buttonClass = "btn btn-danger";
      } else if (p.score <= GameConfiguration.InitialPoints * GameConfiguration.WarningThreshold) {
        buttonClass = "btn btn-warning";
      } else {
        //if (gameState.inProgress) {
          buttonClass = "btn btn-success";
        //} else {
          //buttonClass = "btn btn-default";
        //}
      }

      if (p._id === currentPlayerId) {
        buttonClass += " self";
      }

      return _.extend(p, {
        showScore: p.score != null,
        buttonClass: buttonClass,
        disableAttack: !gameState.inProgress || p.score <= 0 || Session.get("currentPlayerId") == null
      });
    });
  },
  gameState() {
    return GameState.findOne();
  },
  strongestAttacker() {
    const gameState = GameState.findOne();
    if (gameState.inProgress || gameState.finishedAt == null) {
      return;
    }

    const strongestAttacker = Players.findOne({ attacks: { $gt: 0 } }, { sort: { attacks: -1 } });
    if (strongestAttacker == null) {
      return;
    }

    const gameTime = (gameState.finishedAt - gameState.startedAt) / 1000;
    strongestAttacker.clicksPerSecond = (strongestAttacker.attacks / gameTime).toFixed(2);

    return strongestAttacker;
  }
});

Template.game.events({
  'click button'(event) {
    event.preventDefault();

    const playerIdToAttack = event.target.value;
    const playerToAttack = Players.findOne({ _id: playerIdToAttack });
    if (playerToAttack.score > 1) {
      SoundFx.playRandom();
    } else {
      // Death sound effect
      SoundFx.playFileName("attack.mp3");
    }

    const attackingPlayerId = Session.get('currentPlayerId');
    Meteor.call("players.attack", playerIdToAttack, attackingPlayerId);
  }
});

// Template.game.onDestroyed(function() {
//   this.currentPlayerWatchHandle.stop();
// });