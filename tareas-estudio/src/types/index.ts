export interface StudySession {
  date: string;
  duration: number; // en minutos
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  pomodoros: number;
  sessions: StudySession[];
  totalTime: number; // en minutos
}
