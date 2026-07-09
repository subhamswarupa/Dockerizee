import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import Stats from "../components/Stats";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    priority: "",
    category: "",
    completed: "",
    sort: "createdAt",
  });

  const fetchTasks = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.append(k, v);
      });
      const { data } = await api.get(`/tasks?${params.toString()}`);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get("/tasks/stats");
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  const createTask = async (form) => {
    try {
      await api.post("/tasks", form);
      fetchTasks();
      fetchStats();
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const updateTask = async (form) => {
    try {
      await api.put(`/tasks/${editing._id}`, form);
      setEditing(null);
      fetchTasks();
      fetchStats();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (task) {
        await api.put(`/tasks/${id}`, { completed: !task.completed });
        fetchTasks();
        fetchStats();
      }
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
      fetchStats();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleSubmit = (form) => {
    if (editing) {
      updateTask(form);
    } else {
      createTask(form);
    }
  };

  return (
    <div>
      <Stats stats={stats} />
      <TaskForm onSubmit={handleSubmit} editing={editing} onCancel={() => setEditing(null)} />
      <TaskFilters filters={filters} onChange={setFilters} />
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No tasks found. Create one above!
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={toggleComplete}
              onEdit={setEditing}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
