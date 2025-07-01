import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { Task } from '../types';
import { UserService } from './user-service';

export class TaskService {
  static async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const tasksRef = collection(db, 'tasks');
    const docRef = await addDoc(tasksRef, {
      ...taskData,
      dueDate: Timestamp.fromDate(taskData.dueDate),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Update user's total tasks created
    const user = await UserService.getUser(taskData.userId);
    if (user) {
      const calcTotalTasks = user.totalTasksCreated ? user.totalTasksCreated+1 : 1;
      await UserService.updateUser(taskData.userId, {
        totalTasksCreated: calcTotalTasks,
      });
    }

    return docRef.id;
  }

  static async getUserTasks(userId: string): Promise<Task[]> {
    const tasksRef = collection(db, 'tasks');
    const q = query(
      tasksRef,
      where('userId', '==', userId),
      orderBy('dueDate', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dueDate: data.dueDate.toDate(),
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        completedAt: data.completedAt?.toDate(),
      } as Task;
    });
  }

  static async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    const taskRef = doc(db, 'tasks', taskId);
    const updateData: any = {
      ...updates,
      updatedAt: serverTimestamp(),
    };

    if (updates.dueDate) {
      updateData.dueDate = Timestamp.fromDate(updates.dueDate);
    }

    if (updates.completedAt) {
      updateData.completedAt = Timestamp.fromDate(updates.completedAt);
    }

    await updateDoc(taskRef, updateData);
  }

  static async completeTask(taskId: string, userId: string): Promise<void> {
    await this.updateTask(taskId, {
      status: 'completed',
      completedAt: new Date(),
    });

    // Update user stats and streak
    const user = await UserService.getUser(userId);
    if (user) {
      const calcTotalTasks = user.totalTasksCompleted ? user.totalTasksCompleted+1 : 1;
      await UserService.updateUser(userId, {
        totalTasksCompleted: calcTotalTasks,
      });
      await UserService.updateStreak(userId);
    }
  }

  static async deleteTask(taskId: string): Promise<void> {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  }

  static async getOverdueTasks(userId: string): Promise<Task[]> {
    const tasks = await this.getUserTasks(userId);
    const now = new Date();
    
    return tasks.filter(task => 
      task.status === 'pending' && task.dueDate < now
    );
  }

  static async updateOverdueTasks(userId: string): Promise<void> {
    const overdueTasks = await this.getOverdueTasks(userId);
    
    for (const task of overdueTasks) {
      await this.updateTask(task.id, { status: 'overdue' });
    }
  }
}