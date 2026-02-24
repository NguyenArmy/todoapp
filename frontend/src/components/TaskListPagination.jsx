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

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(event) => handlePageClick(event, currentPage - 1)}
                        className={cn(
                            currentPage === 1 && "pointer-events-none opacity-50"
                        )}
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1
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
