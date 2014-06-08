if (Items.find().count() === 0) {
  Items.insert({
    title: "build meteor todo list",
    createdAt: new Date(),
    completed: false
  });

  Items.insert({
    title: "buy groceries",
    createdAt: new Date(),
    completed: false
  });
}