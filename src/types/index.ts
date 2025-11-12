// Tipos para el sistema educativo
export interface Module {
  id: string;
  title: string;
  subject: 'math' | 'science' | 'social';
  icon: string;
  description: string;
  progress: number;
  color: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  moduleId: string;
  score: number;
  completedAt: Date;
  attempts: number;
}

// Tipos para accesibilidad
export interface A11yProps {
  role?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  tabIndex?: number;
}
