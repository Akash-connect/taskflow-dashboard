export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedUser: string;
  dueDate: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
}