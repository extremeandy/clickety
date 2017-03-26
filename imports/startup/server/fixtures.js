// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Players } from '../../api/players/players.js';
import { GameState } from '../../api/game/game-state.js';

Meteor.startup(() => {
  // Remove all players
  Players.remove({});

  // Setup default game-state
  GameState.remove({});
  GameState.insert({
    inProgress: false,
    description: "Waiting for admin to start game"
  });
});

// Meteor.startup(() => {
//   // if the Links collection is empty
//   if (Links.find().count() === 0) {
//     const data = [
//       {
//         title: 'Do the Tutorial',
//         url: 'https://www.meteor.com/try',
//         createdAt: new Date(),
//       },
//       {
//         title: 'Follow the Guide',
//         url: 'http://guide.meteor.com',
//         createdAt: new Date(),
//       },
//       {
//         title: 'Read the Docs',
//         url: 'https://docs.meteor.com',
//         createdAt: new Date(),
//       },
//       {
//         title: 'Discussions',
//         url: 'https://forums.meteor.com',
//         createdAt: new Date(),
//       },
//     ];
//
//     data.forEach(link => Links.insert(link));
//   }
// });
