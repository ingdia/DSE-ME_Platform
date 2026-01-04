export interface Assignment {
  title: string;
  description?: string;
  type: "Quiz" | "Capstone" | "Assignment";
  course: string;
  chapter: string;
  dueDate: string;
  maxScore: number;
}
