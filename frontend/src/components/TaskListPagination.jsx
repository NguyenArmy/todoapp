import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const TaskListPagination = ({ currentPage, totalPages, onPageChange }) => {
    if (!totalPages || totalPages <= 1) {
        return null
    }

    const handlePageClick = (event, page) => {
        event.preventDefault()
        if (page < 1 || page > totalPages || page === currentPage) return
        onPageChange(page)
    }

    const pageNumbers = (() => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, index) => index + 1)
        }

        const pages = [1]
        const from = Math.max(2, currentPage - 1)
        const to = Math.min(totalPages - 1, currentPage + 1)

        if (from > 2) {
            pages.push("left-ellipsis")
        }

        for (let page = from; page <= to; page += 1) {
            pages.push(page)
        }

        if (to < totalPages - 1) {
            pages.push("right-ellipsis")
        }

        pages.push(totalPages)
        return pages
    })()

    return (
        <Pagination className="justify-start sm:justify-center">
            <PaginationContent className="max-w-full flex-nowrap overflow-x-auto pb-1">
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(event) => handlePageClick(event, currentPage - 1)}
                        className={cn(
                            currentPage === 1 && "pointer-events-none opacity-50"
                        )}
                    />
                </PaginationItem>

                {pageNumbers.map((page, index) => {
                    if (typeof page !== "number") {
                        return (
                            <PaginationItem key={`${page}-${index}`}>
                                <span className="px-1 text-muted-foreground">...</span>
                            </PaginationItem>
                        )
                    }

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(event) => handlePageClick(event, page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(event) => handlePageClick(event, currentPage + 1)}
                        className={cn(
                            currentPage === totalPages && "pointer-events-none opacity-50"
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default TaskListPagination
