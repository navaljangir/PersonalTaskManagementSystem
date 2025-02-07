/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/app/lib/actions/project/createProject";
import { useActionState, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateProject() {
  const session = useSession()
  const userId = session?.data?.user.id || ''
  const queryClient = useQueryClient();
  //Querying for the project addition
  const { mutateAsync: addProject } = useMutation({
    mutationFn: async (formData: FormData) => {
      const projectTitle = formData.get('projectname') as string
      const projectDescription = formData.get('description') as string
      const res = await createProject(userId, projectTitle, projectDescription)
      return res
      //Invalidating the process
    },onSuccess : ()=> {
      queryClient.invalidateQueries({queryKey : ['getAllProjects']})
    }
  })
  const projectCreate = async (initialState: boolean | null, formData: FormData) => {
    const res = await addProject(formData)
    if (res.success) {
      toast.success(res.message, {
        duration: 2000
      })
      setCreateProjectOpen(false)
      return true
    } else {
      toast.error(res.message, {
        duration: 2000
      })
      return false
    }
  }
  const [state, formAction, isPending] = useActionState(projectCreate, null);
  const [createProjectOpen , setCreateProjectOpen] = useState(false)
  return (
    <Dialog open={createProjectOpen} onOpenChange={setCreateProjectOpen}>
        <Button onClick={()=> setCreateProjectOpen(true)}>New Project</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectname">Project Name</Label>
            <Input
              id="projectname"
              name="projectname"
              required
              placeholder="Project X"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Project description..."
            />
          </div>
          <Button type="submit" formAction={formAction} disabled={isPending}>Create Project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}