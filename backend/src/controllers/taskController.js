const Task = require("../models/Task");

exports.getTasks = async (req, res, next) => {
  try {
    const { search, priority, category, completed, sort } = req.query;
    const filter = { user: req.user._id };
    if (completed !== undefined) filter.completed = completed === "true";
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    let sortOption = { createdAt: -1 };
    if (sort === "dueDate") sortOption = { dueDate: 1 };
    if (sort === "priority") sortOption = { priority: -1 };
    if (sort === "title") sortOption = { title: 1 };
    const tasks = await Task.find(filter).sort(sortOption);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const [total, completed, pending, byPriority] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, completed: true }),
      Task.countDocuments({ user: userId, completed: false }),
      Task.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$priority", count: { $sum: 1 } } },
      ]),
    ]);
    res.json({ total, completed, pending, byPriority });
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
