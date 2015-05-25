Template.editItem.events({
  "submit form": function(event) {
    event.preventDefault();

    item = {
      title: $(event.target).find("input[type='text']").val(),
      body:  $(event.target).find("textarea").val()
    };

    Meteor.call('updateItem', this._id, item, function(error, id) {
      if (error)
        return alert(error.reason);
      else
        Router.go("items");
    });
  }
});

Template.editItem.helpers({
  titleWithHashtags: function() {
    formattedHashtags = _(this.hashtags).map(function(tag) { return "#" + tag })
    return this.title + " " + formattedHashtags.join(" ");
  }
});