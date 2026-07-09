export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const priorityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div
      className={`p-4 rounded-lg border transition ${
        task.completed
          ? "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-75"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task._id)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <div className="min-w-0">
            <h3
              className={`font-medium truncate ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}
              >
                {task.priority}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {task.category}
              </span>
              {task.dueDate && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
