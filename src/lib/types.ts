export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  updatedAt: Date;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date | null;
  totalTasksCompleted: number;
  totalTasksCreated: number;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  category?: string;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'task_created' | 'task_completed' | 'task_deleted' | 'streak_updated';
  description: string;
  date: Date;
  metadata?: Record<string, any>;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  weeklyActivity: Array<{
    date: string;
    completed: number;
    created: number;
  }>;
}