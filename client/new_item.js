Template.newItem.events({
  "submit form": function (event) {
    event.preventDefault();
    
    item = {
      title: $(event.target).find("input[type='text']").val(),
    }

    Meteor.call('createItem', item, function(error, id) {
      if (error)
        return alert(error.reason);
    });
  }
});