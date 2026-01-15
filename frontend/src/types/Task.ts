export interface Task {
  id: string;
  title: string;
  deadline: Date;
  status: "todo" | "done";
  alertLevel: 0 | 1 | 2 | 3; // 0: Off, 1: Visual, 2: System, 3: Force
}
