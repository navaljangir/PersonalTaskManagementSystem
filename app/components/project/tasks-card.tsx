'use client'

import { taskType } from "@/lib/types"
import { EditTask } from "./edit-task"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export function TaskCard({sortedTasks }: {sortedTasks : taskType[]}){
    return (
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
                Due: {format(new Date(task.dueDate!) , 'dd/MM/y')}
              </span>
              <Badge variant="outline">{task.priority}</Badge>
            </div>
          </div>
        ))}
      </div>
    )
}