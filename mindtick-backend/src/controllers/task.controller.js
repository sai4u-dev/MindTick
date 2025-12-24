const Task = require("../models/Task.model");

/**
 * Create Task
 */
exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    createdBy: req.user._id,
  });

  res.status(201).json(task);
};

/**
 * Get All Tasks (User specific)
 */
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(tasks);
};

/**
 * Get Single Task
 */
exports.getTaskById = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

/**
 * Update Task
 */
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

/**
 * Delete Task
 */
exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
};

/**
 * Update Status (Quick Action)
 */
exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    { status },
    { new: true }
  );

  res.json(task);
};
