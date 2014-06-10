// ****************************************************************************
// Items Template

Template.items.helpers({
  itemsByDate: function() {
    var items = Items.find().fetch();
    var groupedByDate = _.groupBy(items, function(item) {
      return (new Date(item.dueAt)).toDateString();
    });

    var groupedArray = _.map(groupedByDate, function(value, key) { return {date: key, items: value}; });
    var sortedArray = _.sortBy(groupedArray, 'date');


    return sortedArray;
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
    properties = {completed: $(event.target).is(":checked")};

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

// ****************************************************************************
// Item Template

Template.item.rendered = function() {
  $('.datepicker').datepicker();
}

Template.item.events({
  "change input.datepicker": function(event) {
    properties = {dueAt: $(event.target).val()};
    Items.update(this._id, {$set: properties}, function(error) {
      if (error) {
        alert(error.reason)
      }
    });
  }
});