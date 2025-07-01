"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, X } from "lucide-react";
import { Task } from "@/lib/types";
import { TaskService } from "@/lib/services/task-service";
import { useTaskStore } from "@/lib/stores/task-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
}

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
  onSuccess?: () => void;
}

export function TaskForm({ task, onClose, onSuccess }: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addTask, updateTask } = useTaskStore();
  const { user } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      priority: task?.priority || 'medium',
      dueDate: task?.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
      category: task?.category || '',
    }
  });

  const onSubmit = async (data: TaskFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const taskData = {
        ...data,
        dueDate: new Date(data.dueDate),
        userId: user.uid,
        status: 'pending' as const,
      };

      if (task) {
        // Update existing task
        await TaskService.updateTask(task.id, taskData);
        updateTask(task.id, taskData);
        toast.success("Task updated successfully!");
      } else {
        // Create new task
        const taskId = await TaskService.createTask(taskData);
        const newTask: Task = {
          id: taskId,
          ...taskData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        addTask(newTask);
        toast.success("Task created successfully!");
      }
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{task ? 'Edit Task' : 'Create New Task'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                {...register('priority')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date *
              </label>
              <input
                {...register('dueDate', { required: 'Due date is required' })}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                {...register('category')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Work, Personal, Study"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Saving...' : (task ? 'Update' : 'Create')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}