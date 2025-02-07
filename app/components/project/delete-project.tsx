// delete-project.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import axios from 'axios'
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function DeleteProject({ projectId }: { projectId: number }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient()
    const {mutateAsync : handleDelete , isPending} = useMutation({
        mutationFn : async()=>{
            console.log('printing projectid', projectId)
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteProject`, {
                projectId : projectId
            })
            console.log(data)
            if(data.success){
                toast.success(data.message , {
                    duration : 2000
                })
                console.log('closing')
                setOpen(false)
                return true
            }else{
                toast.error(data.message , {
                    duration : 2000
                })
                return false
            }
        }, 
        onSuccess : ()=>{
            queryClient.invalidateQueries({queryKey : ['getAllProjects']})
        }
    })
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
                Delete
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>Are you sure you want to delete this project and all its tasks?</p>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={()=>handleDelete()} disabled={isPending}>
                            Delete
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}