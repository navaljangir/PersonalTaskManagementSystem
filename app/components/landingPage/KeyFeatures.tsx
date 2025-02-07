import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AudioLines, Calendar, Timer } from "lucide-react";

const features = [
    {
        heading: 'Smart Task Management',
        subheading: 'Organize tasks by priority, and deadline',
        icon: <Timer size={50} className="mx-auto text-blue-600" />
    },
    {
        heading: 'Project Tracking',
        subheading: 'Manage multiple projects with ease',
        icon : <AudioLines size={50} className="mx-auto text-blue-600" />
    },
    {
        heading: 'Calendar View',
        subheading : 'Get a clear overview of your tasks and deadlines',
        icon :  <Calendar size={50} className="mx-auto text-blue-600"/>
    }
]

export function KeyFeaturesPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((val, index) => {
                return <Card className="mt-10" key={index}>
                    <CardHeader className="w-full">
                        {val.icon}
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="text-2xl">
                            {val.heading}
                        </div>
                        <div>
                            {val.subheading}
                        </div>
                    </CardContent>
                </Card>
            })
            }
        </div>
    )
}