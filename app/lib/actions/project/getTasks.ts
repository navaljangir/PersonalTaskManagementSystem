'use server'

import { db } from "@/db/db"
import { tasks } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getTasks(userId : string){
    try{
        const res= await db.query.tasks.findMany({where : eq(tasks.userId , userId)})
        return res
    }catch(e){
        console.log('Error while fetching the tasks', e)
        return []
    }
}