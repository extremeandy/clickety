import './home.html';

import { Players } from '/imports/api/players/players.js';
import '../../components/register/register.js';
import '../../components/game/game.js';

// Template.App_home.onCreated(function () {
//   Meteor.subscribe('players.all');
// });

Template.App_home.helpers({
    currentPlayer: () => {
        const currentPlayerId = Session.get("currentPlayerId");
        return Players.findOne({ _id: currentPlayerId });
    }
});
