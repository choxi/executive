Template.items.helpers({
  itemsByDate: function() {
    var items = Items.find().fetch();
    var groupedByDate = _.groupBy(items, 'dueAt')


    return _.map(groupedByDate, function(value, key) { return {date: key, items: value}; });
  },

  checked: function() {
    if(this.completed) {
      return "checked";
    } else {
      return "";
    }
  },

  formattedDate: function() {
    return (new Date(this.date)).toDateString();
  }
});

Template.items.events({
  "click input[type='checkbox']": function(event) {
    properties = {completed: $(event.target).is(":checked")}

    Items.update(this._id, {$set: properties}, function(error) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  "click .glyphicon-remove-circle": function(event) {
    event.preventDefault();

    if (confirm("Delete this item?")) {
      Items.remove(this._id);
    }
  }
});