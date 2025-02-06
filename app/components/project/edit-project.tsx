/* eslint-disable @typescript-eslint/no-unused-vars */
// edit-project.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/app/lib/actions/project/updateProject";
import { useActionState, useState } from "react";
import { projectType } from "@/lib/types";
import { toast } from "sonner";

export function EditProject({ project }: { project: projectType }) {
  const [open, setOpen] = useState(false);
  const projectUpdate = async (_ : boolean | null, formData: FormData) => {
    const res=  await updateProject(
      project.id,
      formData.get("projectname") as string,
      formData.get("description") as string
    );
    if(res.success){
        toast.success(res.message , {
            duration : 2000
        })
    }else{
        toast.error(res.message , {
            duration : 2000
        })
    }
    setOpen(false);
    return null;
  };
  const [state, formAction ,isPending] = useActionState(projectUpdate, null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectname">Project Name</Label>
            <Input
              id="projectname"
              name="projectname"
              required
              defaultValue={project.name}
              maxLength={30}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project.description!}
              maxLength={100}
            />
          </div>
          <Button type="submit" disabled={isPending}>Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}