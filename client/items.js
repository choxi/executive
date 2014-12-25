Meteor.subscribe('items');

// ****************************************************************************
// Items Template

Template.items.helpers({
  itemsByDate: function() {
    var items = Items.find().fetch();

    var groupedByDate = _.groupBy(items, function(item) {
      if (typeof item.dueAt == "undefined" || item.dueAt == null)
        return (new Date(undefined)).toDateString();
      else
        return (new Date(item.dueAt)).toDateString();
    });

    var groupedArray = _.map(groupedByDate, function(value, key) { return {date: key, items: value}; });
    var sortedArray = _.sortBy(groupedArray, function(group) {
      if(group.date === "Invalid Date")
        return new Date("3000-01-01"); // hack to keep backlog at the top
      else
        return new Date(group.date)
    }).reverse();

    return sortedArray;
  },

  formattedDate: function() {
    if(this.date == "Invalid Date")
      return "Backlog";
    else
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

  "click .remove-item": function(event) {
    event.preventDefault();

    if (confirm("Delete this item?")) {
      Items.remove(this._id);
    }
  },

  "click .expand-item": function(event) {
    event.preventDefault();

    $(event.currentTarget).closest(".list-group-item").toggleClass("expanded")
  }
});

// ****************************************************************************
// Item Template
Template.item.helpers({
  placeholderDate: function() {
    if(typeof this.dueAt != "undefined")
      return moment(this.dueAt).format('L');
  },

  checked: function() {
    if(this.completed) {
      return "checked";
    } else {
      return "";
    }
  },

  stale: function() {
    created   = moment(this.createdAt);
    staleDate = moment().subtract(14, 'days');

    return created.isBefore(staleDate);
  }
})

Template.item.events({
  "change input.datepicker": function(event) {
    item = {dueAt: $(event.target).val()};

    Meteor.call('updateItem', this._id, item, function(error, id) {
      if (error)
        return alert(error.reason);
    });
  },

  "click .change-date": function(event) {
    $anchor = $(event.target);
    itemId = this._id

    $anchor.datepicker("show").on("changeDate", function(event) {
      item = {dueAt: event.date};

      Meteor.call('updateItem', itemId, item, function(error, id) {
        if (error)
          return alert(error.reason);
      });

      $anchor.datepicker("hide");
    });
  },


  "click .backlog-item": function(event) {
    event.preventDefault();

    Meteor.call('updateItem', this._id, {dueAt: null}, function(error, id) { // hack to keep backlog at the top
      if (error)
        return alert(error.reason);
    });
  }
});