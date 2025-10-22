export type Priority = "Eventual" | "Normal" | "Urgente";

export type TaskModel = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  priority: Priority;
  done: boolean;
  userId: string;
};
