Template.addTaskBar.events({

  "submit .add-task-form": function (e,t) {

    var newItem = e.target.newTask.value;

    // TODO: add proper check for any amout of empty text with spaces
    if (newItem == "") {
      return false;
    } else if (newItem == " ") {
      return false;
    } else {


      Meteor.call("addNewItem", newItem, Meteor.user()._id, function (err,res) {
        console.log(res);
        scrollDown();
      });

    }

    e.target.newTask.value = "";
    return false;
  }

});
