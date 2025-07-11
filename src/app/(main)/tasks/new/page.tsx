"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskForm } from "@/components/tasks/task-form";

export default function NewTaskPage() {
  const router = useRouter();

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <TaskForm
          onClose={() => router.push('/tasks')}
          onSuccess={() => router.push('/tasks')}
        />
      </div>
    </>
  );
}