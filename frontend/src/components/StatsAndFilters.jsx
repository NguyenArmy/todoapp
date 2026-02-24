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
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-3">
                <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-600 border-blue-300">
                    {activeTasksCount} {FilterType.active}
                </Badge>

                <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-600 border-green-300"
                >
                    {completedTasksCount} {FilterType.completed}
                </Badge>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
                {Object.keys(FilterType).map((type) => (
                    <Button
                        key={type}
                        variant={filter === type ? "gradient" : "ghost"}
                        size="sm"
                        className="capitalize"
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