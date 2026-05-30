"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, Users, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen text-slate-900 dark:text-white lg:flex">
      <aside className="glass-card z-20 border-b p-5 lg:fixed lg:left-5 lg:top-5 lg:h-[calc(100vh-40px)] lg:w-64 lg:rounded-3xl">
        <h1 className="mb-8 text-3xl font-black tracking-tight text-blue-600">
          TaskFlow
        </h1>

        <nav className="flex gap-3 overflow-x-auto lg:flex-col">
          <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
          <NavLink href="/tasks" icon={<ListTodo size={18} />} text="Tasks" />
          <NavLink href="/team" icon={<Users size={18} />} text="Team" />

          <Link
            href="/login"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500 hover:text-white lg:mt-auto"
          >
            <LogOut size={18} />
            Logout
          </Link>
        </nav>
      </aside>

      <section className="w-full lg:ml-72">
        <header className="sticky top-0 z-10 border-b border-slate-200/40 bg-white/60 px-6 py-4 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/60">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Task & Team Dashboard
            </p>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white shadow-lg">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8">{children}</div>
      </section>
    </main>
  );
}

function NavLink({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
          : "text-slate-700 hover:bg-blue-600 hover:text-white dark:text-slate-300"
      }`}
    >
      {icon}
      {text}
    </Link>
  );
}