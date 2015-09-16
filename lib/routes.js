Router.configure({
  layoutTemplate: 'singleLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'home',
  template: 'home',
  onBeforeAction: function () {
    if (Meteor.user()) {
      this.next();
    } else {
      this.render("login");
    }
  },
  action: function () {
    this.redirect("items");
  }
});

Router.route('/items', {
  name: 'items',
  template: 'items',
  layoutTemplate: 'layout',
  onBeforeAction: function () {
    if (Meteor.user()) {
      this.next();
    } else {
      this.redirect("home");
    }
  },
  waitOn: function () {
    return Meteor.subscribe('items', Meteor.userId());
  },
  action: function () {
    this.render();
  }
});

Router.route('/item/:itemId', {
  name: 'singleItem',
  template: 'singleItem',
  onBeforeAction: function () {
    if (Meteor.user()) {
      this.next();
    } else {
      this.redirect("home");
    }
  },
  waitOn: function () {
    return Meteor.subscribe('item', Meteor.userId(), this.params.itemId);
  },
  data: function () {
    return Items.findOne({"_id": this.params.itemId});
  },
  action: function () {
    this.render();
  }
});

Router.route('/loading', {
  name: 'loading',
  template: 'loading'
})
