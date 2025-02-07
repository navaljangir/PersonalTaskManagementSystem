import { MyCalendar } from "@/app/components/ui/BigCalendar"
import { getProjects } from "@/app/lib/actions/project/getProjects"
import { authOptions } from "@/app/lib/NextAuthOptions"
import { getServerSession } from "next-auth"

export default async function Tasks() {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const projects =await getProjects(userId!)
    return <div>
        <MyCalendar projects={projects}/>
    </div>
}