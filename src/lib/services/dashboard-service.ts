import { TaskService } from './task-service';
import { UserService } from './user-service';
import { DashboardStats } from '../types';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';

export class DashboardService {
  static async getDashboardStats(userId: string): Promise<DashboardStats> {
    const [tasks, user] = await Promise.all([
      TaskService.getUserTasks(userId),
      UserService.getUser(userId)
    ]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Weekly activity
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const weeklyActivity = weekDays.map(day => {
      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const completed = tasks.filter(task => 
        task.completedAt && 
        task.completedAt >= dayStart && 
        task.completedAt <= dayEnd
      ).length;

      const created = tasks.filter(task => 
        task.createdAt && 
        task.createdAt >= dayStart && 
        task.createdAt <= dayEnd
      ).length;

      return {
        date: format(day, 'MMM dd'),
        completed,
        created,
      };
    });

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      completionRate,
      currentStreak: user?.currentStreak || 0,
      longestStreak: user?.longestStreak || 0,
      weeklyActivity,
    };
  }
}