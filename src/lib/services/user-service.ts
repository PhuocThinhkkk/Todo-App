import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';

export class UserService {
  static async createUser(userData: Omit<User, 'createdAt' | 'updatedAt'>): Promise<void> {
    const userRef = doc(db, 'users', userData.uid);
    await setDoc(userRef, {
      ...userData,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      totalTasksCompleted: 0,
      totalTasksCreated: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  static async getUser(uid: string): Promise<User | null> {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        lastActivityDate: data.lastActivityDate?.toDate() || null,
      } as User;
    }
    
    return null;
  }

  static async updateUser(uid: string, updates: Partial<User>): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }

  static async updateStreak(uid: string): Promise<void> {
    const user = await this.getUser(uid);
    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastActivity = user.lastActivityDate;
    let newStreak = user.currentStreak;

    if (!lastActivity) {
      newStreak = 1;
    } else {
      const lastActivityDate = new Date(lastActivity);
      lastActivityDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        newStreak += 1;
      } else if (daysDiff > 1) {
        newStreak = 1;
      }
    }

    const longestStreak = Math.max(user.longestStreak, newStreak);

    await this.updateUser(uid, {
      currentStreak: newStreak,
      longestStreak,
      lastActivityDate: today,
    });
  }
}