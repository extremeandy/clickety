// Methods related to players

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Players } from './players.js';

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
  'players.attack'(id) {
    const player = Players.findOne({ _id: id });
    var newScore = Math.max(player.score - 1, 0);
    Players.update({ _id: id}, { $set: { score: newScore }});
  }
});
