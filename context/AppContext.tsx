"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initialTasks } from "@/data/tasks";
import { initialMembers } from "@/data/members";
import { Task, TeamMember } from "@/types";

interface AppContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  members: TeamMember[];
  setMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("taskflow-tasks");
    const storedMembers = localStorage.getItem("taskflow-members");

    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedMembers) setMembers(JSON.parse(storedMembers));

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("taskflow-members", JSON.stringify(members));
    }
  }, [members, mounted]);

  return (
    <AppContext.Provider value={{ tasks, setTasks, members, setMembers }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}