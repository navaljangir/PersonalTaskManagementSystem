/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/app/lib/actions/createTask";
import { useFormState } from "react-dom";
import { useActionState, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function CreateTask({ projectId }: { projectId?: number }) {
  const session = useSession();
  const userId = session.data?.user.id
  const [date,setDate] = useState<Date | undefined>(new Date())
  const storeTask = async(state : boolean | null , formAction : FormData)=>{
    if(!date){
      toast.error('Select a date', {
        duration : 2000
      })
      return false
    }
    if(projectId){
      await createTask(userId!, projectId , formAction, date)
      return true
    }
    return false
  }
  const [state, formAction] = useActionState(storeTask, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="projectId" value={projectId} />
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="Task title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Task details..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select name="status" defaultValue="pending">
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
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select name="priority" defaultValue="medium">
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
          
          <div className="space-y-2">
            <Label>Due Date: </Label>
            <span>{date?.toISOString().split('T')[0]}</span>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date)=>{
                const currDate = new Date()
                return date<currDate
              }}
            />
          </div>
          
          <Button type="submit">Create Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}