"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { useAppContext } from "@/context/AppContext";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  Users,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const { tasks, members } = useAppContext();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { title: "Total Tasks", value: totalTasks, icon: ListTodo, color: "from-blue-500 to-cyan-500" },
    { title: "Completed", value: completedTasks, icon: CheckCircle2, color: "from-emerald-500 to-green-500" },
    { title: "Pending", value: pendingTasks, icon: Clock, color: "from-amber-500 to-orange-500" },
    { title: "Members", value: members.length, icon: Users, color: "from-violet-500 to-fuchsia-500" },
  ];

  return (
    <AppLayout>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            Project Overview
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Manage tasks, team members, and project progress with a clean modern workspace.
          </p>
        </div>

        <Link
          href="/tasks"
          className="rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          Manage Tasks
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="glass-card rounded-3xl p-6 transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <h2 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 text-white shadow-lg`}>
                  <Icon size={26} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="glass-card rounded-3xl p-6 xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">
              Recent Tasks
            </h3>

            <Link
              href="/tasks"
              className="flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {tasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">
                      {task.title}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Assigned to {task.assignedUser}
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">
            Project Progress
          </h3>

          <div className="mt-8">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Overall Completion</span>
              <span className="font-black text-blue-600">{progress}%</span>
            </div>

            <div className="mt-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              Complete pending tasks to improve your project completion score.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}