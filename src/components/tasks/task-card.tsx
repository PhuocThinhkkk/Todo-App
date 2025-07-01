"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Flag, MoreVertical, Check, Trash2, Edit } from "lucide-react";
import { Task } from "@/lib/types";
import { formatRelativeDate, getPriorityColor, getStatusColor } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskService } from "@/lib/services/task-service";
import { useTaskStore } from "@/lib/stores/task-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import toast from "react-hot-toast";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { updateTask, deleteTask } = useTaskStore();
  const { user } = useAuthStore();

  const handleComplete = async () => {
    if (!user || isLoading) return;
    
    setIsLoading(true);
    try {
      await TaskService.completeTask(task.id, user.uid);
      updateTask(task.id, { status: 'completed', completedAt: new Date() });
      toast.success("Task completed! 🎉");
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to complete task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user || isLoading) return;
    
    setIsLoading(true);
    try {
      await TaskService.deleteTask(task.id);
      deleteTask(task.id);
      toast.success("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    } finally {
      setIsLoading(false);
    }
  };

  const isOverdue = task.status === 'overdue' || (task.status === 'pending' && task.dueDate < new Date());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`hover:shadow-md transition-shadow ${isOverdue ? 'border-red-200' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`font-medium text-gray-900 truncate ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h3>
                <Badge className={getPriorityColor(task.priority)}>
                  <Flag className="h-3 w-3 mr-1" />
                  {task.priority}
                </Badge>
              </div>
              
              {task.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatRelativeDate(task.dueDate)}
                </div>
                <Badge variant="outline" className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-1 ml-4">
              {task.status === 'pending' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit?.(task)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDelete}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}