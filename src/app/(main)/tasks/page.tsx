"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus , Search } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useTaskStore } from "@/lib/stores/task-store";
import { TaskService } from "@/lib/services/task-service";
import { Task } from "@/lib/types";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskForm } from "@/components/tasks/task-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TasksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuthStore();
  const { tasks, setTasks } = useTaskStore();

  useEffect(() => {
    const loadTasks = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        await TaskService.updateOverdueTasks(user.uid);
        const userTasks = await TaskService.getUserTasks(user.uid);
        setTasks(userTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [user, setTasks]);

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 text-center lg:text-left">All Tasks</h1>
            <p className="text-gray-600 mt-1">
              Manage and organize your tasks
            </p>
          </div>
          
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            {(['all', 'pending', 'completed', 'overdue'] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {filter === 'all' 
                      ? 'Create your first task to get started!'
                      : `You don't have any ${filter} tasks.`
                    }
                  </p>
                  {filter === 'all' && (
                    <Button onClick={() => setShowForm(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create Task
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard task={task} onEdit={handleEditTask} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask || undefined}
          onClose={handleCloseForm}
          onSuccess={() => {
            // Refresh tasks after successful creation/update
            if (user) {
              TaskService.getUserTasks(user.uid).then(setTasks);
            }
          }}
        />
      )}
    </>
  );
}