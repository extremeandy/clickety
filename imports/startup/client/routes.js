import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/intro/intro.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/intro', {
  name: 'App.intro',
  action() {
    BlazeLayout.render('App_intro', { main: 'App_intro' });
  },
});

FlowRouter.route('/admin', {
  name: 'App.admin',
  action() {
    if (location.host !== "localhost:3000") {
      FlowRouter.redirect('/');
    }
    BlazeLayout.render('App_admin', { main: 'App_admin' });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
