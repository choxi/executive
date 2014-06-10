if (Items.find().count() === 0) {
  today = new Date();
  yesterday =  new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  Items.insert({
    title: "build meteor todo list",
    createdAt: yesterday,
    dueAt: today,
    completed: false
  });

  Items.insert({
    title: "buy groceries",
    createdAt: today,
    dueAt: today,
    completed: false
  });

  Items.insert({
    title: "learn meteor",
    createdAt: yesterday,
    dueAt: yesterday,
    completed: false
  });
}