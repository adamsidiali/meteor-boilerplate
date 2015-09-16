Meteor.methods({

  "addNewItem": function (item, userId) {
    this.unblock();

    var newId;

    Items.insert({
      "item": item,
      "created": new Date(),
      "lastUpdated": new Date(),
      "owner": userId,
      "done": false,
      "notes": "",
      "labels": []
    }, function (err, id) {
      newId = id;
      console.log("added" + id);
    });

    return newId;

  },

  "updateItem": function (id, newItem) {
    Items.update({"_id":id}, { $set: { item:newItem }})
  },

  "removeItem": function (id) {
    Items.remove(id, function (err,res) {
      if (err) {
        return err;
      } else {
        console.log("removed "+ id);
      }
    });
  },

  "finishItem": function (id) {
    Items.update({"_id":id}, { $set: { "done": true, lastUpdated: new Date() }});
  },
  "unfinishItem": function (id) {
    Items.update({"_id":id}, { $set: { "done": false, lastUpdated: new Date() }});
  }

});
