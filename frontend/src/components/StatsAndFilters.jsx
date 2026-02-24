import { FilterType } from '@/lib/data'
import { Filter } from 'lucide-react'
import { Badge } from './ui/badge'
import React from 'react'
import { Button } from './ui/button'

const StatsAndFilters = ({
    completedTasksCount = 0,
    activeTasksCount = 0,
    filter = "all",
    setFilter
}) => {

    return (
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge
                    variant="secondary"
                    className="border-blue-300 bg-blue-100 text-blue-600">
                    {activeTasksCount} {FilterType.active}
                </Badge>

                <Badge
                    variant="secondary"
                    className="border-green-300 bg-green-100 text-green-600"
                >
                    {completedTasksCount} {FilterType.completed}
                </Badge>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:w-auto sm:grid-cols-3">
                {Object.keys(FilterType).map((type) => (
                    <Button
                        key={type}
                        variant={filter === type ? "gradient" : "ghost"}
                        size="sm"
                        className="w-full capitalize sm:w-auto"
                        onClick={() => setFilter(type)}
                    >
                        <Filter className="size-4" />
                        {FilterType[type]}
                    </Button>
                ))}
            </div>

        </div>
    )
}


export default StatsAndFilters