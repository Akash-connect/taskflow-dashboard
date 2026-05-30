"use client";

import { createContext, useContext, useState } from "react";
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