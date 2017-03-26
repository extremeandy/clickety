// All game-related publications

import { Meteor } from 'meteor/meteor';
import { GameState } from '../game-state';

Meteor.publish('gameState', function () {
  return GameState.find();
});