Items = new Meteor.Collection('items');

Items.allow({
  remove: function(userId, doc) {
    return doc && doc.userId === userId;
  },
  update: function(userId, doc) {
    return doc && doc.userId === userId;
  }
});

Meteor.methods({
  createItem: function(itemAttributes) {
    var user = Meteor.user()

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to add items");

    // ensure the post has a title
    if (!itemAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a title');

    itemAttributes = parseHashtagsFromTitle(itemAttributes);

    var itemId = Items.insert({
      userId: user._id,
      title: itemAttributes.title,
      createdAt: new Date().getTime(),
      completed: false,
      hashtags: itemAttributes.hashtags
    });

    return itemId;
  },

  updateItem: function(itemId, itemAttributes) {
    var user = Meteor.user();
    var item = Items.findOne({_id: itemId});

    if (!user)
      throw new Meteor.Error(401, "You need to login to add items");

    if (item.userId != user._id)
      throw new Meteor.Error(401, 'You can only edit your own items');

    if (itemAttributes.title) {
      itemAttributes = parseHashtagsFromTitle(itemAttributes);
    }

    Items.update(itemId, {$set: itemAttributes});
  }
});

var parseHashtagsFromTitle = function(item) {
  // parse out any hashtags
  hashtagRegex            = / #(\w|-|_)+/g
  hashtags                = item.title.match(hashtagRegex);
  hashtags                = _(hashtags).map(function(tag) {return tag.trim().replace("#", "")} )
  item.title    = item.title.replace(hashtagRegex, "")
  item.hashtags = hashtags

  return item;
}