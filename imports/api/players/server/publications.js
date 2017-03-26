// All players-related publications

import { Meteor } from 'meteor/meteor';
import { Players } from '../players.js';

Meteor.publish('players.all', function () {
  return Players.find();
});