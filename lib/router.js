Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('items', {path: '/'});
  this.route('editItem', {
    path: '/items/:_id/edit',
    data: function() { return Items.findOne(this.params._id); }
  });
});