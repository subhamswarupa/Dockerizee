export default function TaskFilters({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none w-64"
      />
      <select
        value={filters.priority}
        onChange={(e) => update("priority", e.target.value)}
        className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={filters.category}
        onChange={(e) => update("category", e.target.value)}
        className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="">All Categories</option>
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="study">Study</option>
      </select>
      <select
        value={filters.completed}
        onChange={(e) => update("completed", e.target.value)}
        className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="">All Status</option>
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>
      <select
        value={filters.sort}
        onChange={(e) => update("sort", e.target.value)}
        className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="createdAt">Newest First</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title A-Z</option>
      </select>
    </div>
  );
}
