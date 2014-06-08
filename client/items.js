Template.items.helpers({
  items: function() {
    return Items.find();
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

  }
});