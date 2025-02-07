import { authOptions } from "@/app/lib/NextAuthOptions";
import { CreateProject } from "@/app/components/project/create-project";
import { ProjectCard } from "@/app/components/project/project-card";
// import { getCurrentUser } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
    const session =await getServerSession(authOptions)
    const userId =session?.user.id
    if (!userId) return redirect("/signin");
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <CreateProject />
      </div>
      <div>
        
        <ProjectCard/>
      </div>
    </div>
  );
}