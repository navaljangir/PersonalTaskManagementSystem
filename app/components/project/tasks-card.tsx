'use client'

import { taskType } from "@/lib/types"
import { EditTask } from "./edit-task"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"
import { SortTasks } from "@/app/lib/getSortedTasks"

export function TaskCard({ tasks }: { tasks: taskType[] }) {
  const [sortPriority, setSortPriority] = useState<"none" | "asc" | "desc">("none");
  const sortedTasks=SortTasks(tasks , sortPriority)
  return (
    <div>
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
      <div className="space-y-2 max-h-64 overflow-scroll no-scrollbar">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className="border p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-medium truncate w-28">{task.title}</h4>
                <p className="text-sm text-muted-foreground truncate w-28">
                  {task.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <EditTask task={task} />
                {/* <DeleteTask taskId={task.id} /> */}
                <Badge>{task.status}</Badge>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Due: {format(new Date(task.dueDate!), 'dd/MM/y')}
              </span>
              <Badge variant="outline">{task.priority}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}