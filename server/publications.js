Meteor.publish('items', function() {
  oldestDate = moment().subtract(1, 'months').toDate();
  return Items.find({userId: this.userId, $or: [{dueAt: {$gt: oldestDate}}, {dueAt: null}, {completed: false}]});
});