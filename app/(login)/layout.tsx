import { getServerSession } from "next-auth";
import Image from "next/image";
import { ReactNode } from "react";
import { authOptions } from "../lib/NextAuthOptions";
import { redirect } from "next/navigation";

export default async function LoginLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  const imgUrl ="https://images.unsplash.com/photo-1578852612716-854e527abf2e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if(session?.user.id){
    redirect('/dashboard')
  }
  return (
    <div className="flex h-screen">
      <div className="w-full lg:w-2/3 flex items-center justify-center">{children}</div>
      <div className="w-1/3 h-full hidden md:block relative">
        <Image src={imgUrl} alt="Background" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}