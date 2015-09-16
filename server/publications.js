Meteor.publish("items", function (ownerId, limit) {
  return Items.find({ "owner": ownerId }, { "limit": limit });
});

Meteor.publish("item", function (ownerId, itemId) {
  return Items.find({ "owner": ownerId, "_id": itemId });
});
