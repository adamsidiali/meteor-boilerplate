Template.login.events({

  "click .login-google": function () {
    Meteor.loginWithGoogle(function(error) {
      if(error) {
        console.log(error);
      } else {
        console.log(Meteor.user().profile.name);
      }
    });
  },

});
