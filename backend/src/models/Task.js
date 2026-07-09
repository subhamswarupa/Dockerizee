const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, default: "" },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: { type: String, trim: true, default: "general" },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true }
);

taskSchema.index({ user: 1, completed: 1 });
taskSchema.index({ user: 1, priority: 1 });
taskSchema.index({ user: 1, category: 1 });
taskSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Task", taskSchema);
