'use server'

import { db } from "@/db/db"
import { priorityType, tasks, taskStatusType } from "@/db/schema"

export async function createTask(userId :string, projectId : number , formData : FormData , date :Date | undefined){
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as taskStatusType || 'pending'
    const priority = formData.get("priority") as priorityType
    const dueDate = date || new Date()
    await db.insert(tasks).values({
        userId,
        projectId, 
        title, 
        description,
        status,
        priority,
        dueDate,
    })
    return {
        success: true,
        message :'Create task successfully'
    }
}