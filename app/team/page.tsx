"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useAppContext } from "@/context/AppContext";
import { TeamMember } from "@/types";
import { Mail, Plus, Trash2, UserRound } from "lucide-react";

export default function TeamPage() {
  const { members, setMembers } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.email) {
      alert("Please fill all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Please enter a valid email");
      return;
    }

    setMembers((prev: TeamMember[]) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
      },
    ]);

    setForm({ name: "", role: "", email: "" });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this team member?")) return;
    setMembers((prev: TeamMember[]) =>
      prev.filter((member) => member.id !== id)
    );
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
          Team Workspace
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white">
          Team Members
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          View team members, add new members, and manage roles.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-black text-slate-950 dark:text-white">
            <Plus size={20} />
            Add New Member
          </h2>

          <div className="space-y-4">
            <input
              className="form-input"
              placeholder="Member name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="form-input"
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />

            <input
              className="form-input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Add Member
            </button>
          </div>
        </form>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="glass-card rounded-3xl p-6 transition hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <UserRound />
                </div>

                <button
                  onClick={() => handleDelete(member.id)}
                  className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200 dark:bg-red-950 dark:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">
                {member.name}
              </h3>

              <p className="mt-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                {member.role}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail size={16} />
                <span className="break-all">{member.email}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}