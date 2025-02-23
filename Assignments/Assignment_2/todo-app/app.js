const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 4000;

app.use(express.json()); 
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${new Date} ${req.method} ${req.url}`);
    next();
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  res.render("tasks.ejs", { tasks });
});

app.get("/task", (req, res) => {
  const taskId = parseInt(req.query.id);
  const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    res.render("task.ejs", { task });
  } else {
    res.status(404).send("Task not found");
  }
});

app.get("/add-task", (req, res) => {
  res.render("addTask.ejs");
});

app.post("/add-task", (req, res) => {
  const { title, description } = req.body;
  const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  res.redirect("/tasks");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
