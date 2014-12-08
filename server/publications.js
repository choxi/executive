Meteor.publish('items', function() {
  return Items.find({userId: this.userId}, {sort: {created_at: 1}, limit: 50});
});