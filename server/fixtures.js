if (Items.find().count() === 0) {
  Items.insert({title: "build meteor todo list", completed: false});
  Items.insert({title: "buy groceries", completed: false});
}