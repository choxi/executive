Template.items.helpers({
  items: function() {
    var items = Items.find().fetch();

    var groupedDates = _.groupBy(_.pluck(items, 'CreatedDate'));

    _.each(_.values(groupedDates), function(dates) {
      console.log({Date: dates[0], Total: dates.length});
    });

    return items;
  },

  checked: function() {
    if(this.completed) {
      return "checked";
    } else {
      return "";
    }
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