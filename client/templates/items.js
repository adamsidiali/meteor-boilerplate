scrollDown = function () {
  var wrap = $(".content");
  var items = $(".items-list");
  wrap.animate({scrollTop:items.innerHeight()}, 200);
}

Template.items.created = function () {
  Session.set("limit", 100);
}


Template.items.rendered = function () {
  scrollDown();
  $('.has-footer').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
      $(".add-task-bar").addClass("without-shadow");
    } else {
      $(".add-task-bar").removeClass("without-shadow");
    }
  })
}

Template.items.helpers({

  "items": function () {
    var query = Items.find({}, {limit: Session.get("limit"), sort: {done: 1,lastUpdated: -1}});
    var count = Items.find({}, {sort: {done: 1,lastUpdated: -1}}).count();

    Session.set("count",count);

    return query;
  },

  "hasMoreItems": function () {

    var limit = Session.get("limit");
    var count = Session.get("count");

    if (count <= 100) {
      return false;
    } else if (limit >= count) {
      return false;
    } else {
      return true;
    }

  }

});

Template.items.events({

  "click .load-more": function (e,t) {

    var count = Session.get("limit");

    Session.set("limit", count + 100);


  },

  "click .item-text.not-done": function (e,t) {

    $(e.target).hide();
    $(e.target).siblings(".edit-item-text").show().focus();
    $(e.target).siblings(".sub-item").removeClass("fa-square-o").removeClass("finish-item").addClass("fa-pencil");
    setEnd($(e.target).siblings(".edit-item-text")[0]);

  },

  "keydown .edit-item-text": function (e) {
    if (e.keyCode == 13) {
      $(e.target).blur();
      return false;
    }
  },

  "blur .edit-item-text": function (e,t) {
    var newItem = $(e.target).text();

    if (newItem == "") {
      alert("Your item is blank! Please add something to it.");
      $(e.target).focus();
    } else {
      Meteor.call("updateItem", this._id, newItem, function (err,res) {
        console.log(res);
        $(e.target).hide();
        $(e.target).siblings(".item-text").show();
        $(e.target).siblings(".sub-item").removeClass("fa-pencil").addClass("fa-square-o").addClass("finish-item");

      });
    }

  },

  "click .remove-item": function (e,t) {
    var self = this;
    var item = $(e.target).parents(".item");
    item.removeClass("animated").removeClass("fadeIn");
    item.addClass("animated").addClass("bounceOutLeft");
    setTimeout(function() {
      Meteor.call("removeItem", self._id, function (err,res) {
        console.log(res);
      });
    }, 800);
  },

  "click .finish-item": function (e,t) {
    var self = this;
    var item = $(e.target).parents(".item");
    item.removeClass("animated").removeClass("fadeIn");
    item.addClass("animated").addClass("bounceOutUp");
    setTimeout(function () {
      Meteor.call("finishItem", self._id, function (err,res) {
        console.log(res);
      });
    }, 700);

  },

  "click .unfinish-item": function () {

    Meteor.call("unfinishItem", this._id, function (err,res) {
      console.log(res);
      scrollDown();
    });

  },

  "click .item-details": function (e,t) {
    Router.go("/item/"+this._id);
  }


});
