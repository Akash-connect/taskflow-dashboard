import { CheckCircle2 } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      <section className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
        <div>
          <h1 className="text-3xl font-bold">TaskFlow</h1>
          <p className="mt-3 text-slate-300 max-w-md">
            Manage tasks, team members, and project progress from one modern dashboard.
          </p>
        </div>

        <div className="space-y-5">
          {["Task management", "Team collaboration", "Project progress tracking"].map(
            (item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" />
                <span>{item}</span>
              </div>
            )
          )}
        </div>

        <p className="text-sm text-slate-400">
          Built with Next.js, TypeScript and Tailwind CSS.
        </p>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-slate-500">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}