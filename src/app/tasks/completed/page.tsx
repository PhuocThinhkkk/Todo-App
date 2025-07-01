"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { TaskService } from "@/lib/services/task-service";
import { Task } from "@/lib/types";
import { TaskCard } from "@/components/tasks/task-card";
import { Card, CardContent } from "@/components/ui/card";

export default function CompletedTasksPage() {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const loadCompletedTasks = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const tasks = await TaskService.getUserTasks(user.uid);
        const completed = tasks.filter(task => task.status === 'completed');
        setCompletedTasks(completed);
      } catch (error) {
        console.error("Error loading completed tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompletedTasks();
  }, [user]);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 justify-center lg:justify-start"
        >
         
          <div>
            <h1 className="flex justify-center lg:justify-start gap-4 text-3xl font-bold text-gray-900 text-center lg:text-left"> 
              <span>Completed Tasks</span>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </h1>
            <p className="text-gray-600 mt-1">
              Celebrate your achievements! Youve completed {completedTasks.length} tasks.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {completedTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No completed tasks yet
                  </h3>
                  <p className="text-gray-600">
                    Complete some tasks to see them here!
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {completedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard task={task} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}