'use server'

import { db } from "@/db/db"
import { priorityType, tasks, taskStatusType } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateTask(taskId: number, formData: FormData, date: Date | undefined) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as taskStatusType || 'pending'
    const priority = formData.get("priority") as priorityType
    const dueDate = date || new Date()
    try{
        await db.update(tasks).set({
            title,
            description,
            status,
            priority,
            dueDate
        }).where(eq(tasks.id , taskId))
        revalidatePath('/projects')
        return {
            success : true,
            message :'Updated Successfully'
        }
    }catch(e){
        console.log('error while updating task' , e)
        return {
            success: false,
            message : 'Cannot Update'
        }
    }
    
}