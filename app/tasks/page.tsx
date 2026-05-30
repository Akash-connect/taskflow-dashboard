"use client";

import { useMemo, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useAppContext } from "@/context/AppContext";
import { Task, TaskPriority, TaskStatus } from "@/types";
import { Plus, Search, Trash2, Pencil } from "lucide-react";

const statusOptions: TaskStatus[] = ["Pending", "In Progress", "Completed"];
const priorityOptions: TaskPriority[] = ["Low", "Medium", "High"];

export default function TasksPage() {
  const { tasks, setTasks } = useAppContext();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const tasksPerPage = 5;

  const [form, setForm] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    assignedUser: "",
    dueDate: "",
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.assignedUser.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage) || 1;

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      assignedUser: "",
      dueDate: "",
    });
    setEditingTask(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.assignedUser || !form.dueDate) {
      alert("Please fill all fields");
      return;
    }

    if (editingTask) {
      setTasks((prev: Task[]) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...form, id: editingTask.id } : task
        )
      );
    } else {
      setTasks((prev: Task[]) => [...prev, { id: Date.now(), ...form }]);
    }

    setCurrentPage(1);
    resetForm();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assignedUser: task.assignedUser,
      dueDate: task.dueDate,
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setTasks((prev: Task[]) => prev.filter((task) => task.id !== id));
    setCurrentPage(1);
  };

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            Task Workspace
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            Task Management
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Create, edit, delete, search and filter project tasks.
          </p>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-black text-slate-950 dark:text-white">
            <Plus size={20} />
            {editingTask ? "Edit Task" : "Create New Task"}
          </h2>

          <div className="space-y-4">
            <input
              className="form-input"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              className="form-input min-h-28"
              placeholder="Task description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              className="form-input"
              placeholder="Assigned user"
              value={form.assignedUser}
              onChange={(e) =>
                setForm({ ...form, assignedUser: e.target.value })
              }
            />

            <input
              type="date"
              className="form-input"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />

            <select
              className="form-input"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value as TaskPriority })
              }
            >
              {priorityOptions.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>

            <select
              className="form-input"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as TaskStatus })
              }
            >
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>

            {editingTask && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <section className="glass-card rounded-3xl p-6">
          <div className="mb-5 grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />
              <input
                className="form-input pl-11"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <select
              className="form-input"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All Status</option>
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <select
              className="form-input"
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All Priority</option>
              {priorityOptions.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="p-4">Task</th>
                  <th className="p-4">Assigned</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-slate-500 dark:text-slate-400"
                    >
                      Loading tasks...
                    </td>
                  </tr>
                ) : (
                  paginatedTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b border-slate-200 transition hover:bg-white/60 dark:border-slate-800 dark:hover:bg-slate-800/60"
                    >
                      <td className="p-4">
                        <h3 className="font-black text-slate-950 dark:text-white">
                          {task.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {task.description}
                        </p>
                      </td>

                      <td className="p-4 text-sm text-slate-700 dark:text-slate-300">
                        {task.assignedUser}
                      </td>

                      <td className="p-4">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                          {task.priority}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {task.status}
                        </span>
                      </td>

                      <td className="p-4 text-sm text-slate-700 dark:text-slate-300">
                        {task.dueDate}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(task)}
                            className="rounded-xl bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(task.id)}
                            className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200 dark:bg-red-950 dark:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}

                {!loading && filteredTasks.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-slate-500 dark:text-slate-400"
                    >
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredTasks.length > 0 && (
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </section>
    </AppLayout>
  );
}