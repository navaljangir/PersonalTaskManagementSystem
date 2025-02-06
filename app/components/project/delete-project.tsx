// delete-project.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import axios from 'axios'
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteProject({ projectId }: { projectId: number }) {
    const [open, setOpen] = useState(false);
    const router= useRouter()
    const handleDelete = async () => {
        console.log('printing projectid', projectId)
        try{
            const res = await axios.post('http://localhost:3000/api/deleteProject', {
                projectId : projectId
            })
            toast.success(res.data.message , {
                duration : 2000    
            })
            setOpen(false);
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(e){
            toast.error('Cannot delete this at the moment' , {
                duration : 2000
            })
        }
    };

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
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}