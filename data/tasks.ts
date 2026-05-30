import { Task } from "@/types";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design Dashboard UI",
    description: "Create responsive dashboard layout",
    priority: "High",
    status: "In Progress",
    assignedUser: "Akash Jadhav",
    dueDate: "2026-06-05",
  },
  {
    id: 2,
    title: "Build Task CRUD",
    description: "Add create, edit and delete functionality",
    priority: "Medium",
    status: "Pending",
    assignedUser: "Rahul Sharma",
    dueDate: "2026-06-08",
  },
  {
    id: 3,
    title: "Create Login Page",
    description: "Add login form with validation",
    priority: "High",
    status: "Completed",
    assignedUser: "Priya Patil",
    dueDate: "2026-06-01",
  },
];