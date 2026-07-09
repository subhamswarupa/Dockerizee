import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Landing() {
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <nav className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          AI Task Manager
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <Link
            to="/login"
            className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Organize Your Tasks{" "}
          <span className="text-indigo-600 dark:text-indigo-400">Smarter</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          A modern task manager with AI-powered insights. Create, organize, and
          track your tasks with ease.
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 transition font-semibold shadow-lg"
        >
          Start Free
        </Link>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Smart Organization", desc: "Categorize and prioritize tasks with ease" },
            { title: "Real-time Stats", desc: "Track your productivity with live statistics" },
            { title: "Dark Mode", desc: "Work comfortably day or night" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
