export default function Stats({ stats }) {
  if (!stats) return null;

  const cards = [
    { label: "Total Tasks", value: stats.total, color: "bg-blue-500" },
    { label: "Completed", value: stats.completed, color: "bg-green-500" },
    { label: "Pending", value: stats.pending, color: "bg-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${card.color}`} />
            <span className="text-sm text-gray-600 dark:text-gray-400">{card.label}</span>
          </div>
          <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
