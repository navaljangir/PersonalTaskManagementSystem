/* eslint-disable @typescript-eslint/no-unused-vars */
// components/project/edit-task.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTask } from "@/app/lib/actions/project/updateTask";
import { useActionState, useState } from "react";
import { taskType } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

export function EditTask({ task }: { task: taskType }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(task.dueDate || undefined);

  const taskUpdate = async (_: boolean | null, formData: FormData) => {
    const res = await updateTask(task.id, formData, date);
    if (res.success) {
      toast.success(res.message, {
        duration: 2000
      })
    } else {
      toast.error(res.message, {
        duration: 2000
      })
    }
    setOpen(false);
    return null;
  };

  const [state, formAction, isPending] = useActionState(taskUpdate, null);

  return (
    //Edit task dialog box
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={task.title}
              maxLength={50}
            />
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={task.description || ""}
              maxLength={200}
            />
          </div>
          {/* Selecting status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select name="status" defaultValue={task.status!}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Selecting Priority */}
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select name="priority" defaultValue={task.priority!}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Selecting the due date */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <div>{date?.toISOString()}</div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          <Button type="submit" disabled={isPending}>Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}