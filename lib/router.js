Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('items', {path: '/'});
  this.route('editItem', {
    path: '/items/:_id/edit',
    data: function() { return Items.findOne(this.params._id); }
  });
  this.route('showHashtag', {
    path: '/hashtags/:_name',
    data: function() { return {items: Items.find({hashtags: ("#" + this.params._name)}).fetch() }; }
  });
});