'use client'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format } from 'date-fns'
import { parse } from 'date-fns'
import { startOfWeek } from 'date-fns'
import { getDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import { projectType } from '@/lib/types'
import { parseISO } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export function MyCalendar({ projects }: { projects: projectType[] }) {
    const calendarEvents = projects
        .flatMap(p => p.tasks)
        .filter(task => task.dueDate)
        .map(task => ({
            title: task.title,
            start: parseISO(task.dueDate!.toISOString()),
            end: parseISO(task.dueDate!.toISOString()),
            resource: {
                status: task.status,
                priority: task.priority
            }
        }))

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm ">
            <h2 className="text-lg font-semibold mb-4">Calendar View</h2>
            <div className="h-[1000px] w-full mb-6">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    defaultView={"month"}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', width: '100%' }}
                    components={{
                        event: ({ event }) => (
                            <div className="text-sm">
                                <div className={`${event.resource.priority === 'high' ? 'border-red-200 bg-red-50' :
                                    event.resource.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                                        'border-green-200 bg-green-50'} pb-1 rounded border-l-4`}>
                                    {event.title}
                                    <div className="text-xs mt-1">
                                        <span className={`px-2 py-1 rounded-full ${event.resource.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            event.resource.status === 'progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                            {event.resource.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) 
                    }}
                />
            </div>
        </div>
    )
}