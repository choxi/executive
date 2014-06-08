Template.newItem.events({
  "submit form": function (event) {
    event.preventDefault();
    
    properties = {
      title: $(event.target).find("input[type='text']").val(),
      completed: false
    }

    Items.insert(properties);
  }
});