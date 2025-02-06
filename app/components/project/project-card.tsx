// project-card.tsx
"use client";

import { useState } from "react";
import { CreateTask } from "./create-task";
import { projectType, taskType } from "@/lib/types";
import { DeleteProject } from "./delete-project";
// import { DeleteTask } from "./delete-task";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { EditProject } from "./edit-project";
import { TaskCard } from "./tasks-card";

export function ProjectCard({ project, tasks }: { project: projectType; tasks: taskType[] | [] }) {
  const [sortPriority, setSortPriority] = useState<"none" | "asc" | "desc">("none");
  const sortedTasks = [...tasks].sort((a, b) => {
    const statusOrder = { progress: 1, pending: 2, completed: 3 } as const;
    const statusA = statusOrder[a.status as keyof typeof statusOrder] || 3;
    const statusB = statusOrder[b.status as keyof typeof statusOrder] || 3;
    if (statusA !== statusB) return statusA - statusB;

    const priorityOrder = { high: 3, medium: 2, low: 1 } as const;
    const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] || 1;
    const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] || 1;
    const priorityCompare = sortPriority === "asc" ? priorityA - priorityB : priorityB - priorityA;
    if (priorityCompare !== 0) return priorityCompare;

    return (a.dueDate!).getTime() - (b.dueDate!).getTime();
  });

  return (
    <div className="border rounded-lg p-4 bg-card shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold truncate w-28">{project.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <EditProject project={project} />
          <DeleteProject projectId={project.id} />
          <CreateTask projectId={project.id} />
        </div>

      </div>
      <p className="text-sm text-muted-foreground truncate w-full">
        {project.description}
      </p>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Tasks</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSortPriority(prev =>
            prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"
          )}
        >
          Sort by Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
        <TaskCard sortedTasks={sortedTasks}/>
      
    </div>
  );
}