"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      {/* Info */}
      <div className="text-sm text-gray-600">
        显示 {startItem} - {endItem} 条，共 {totalItems} 条
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="border-[#E5E0D8] hover:bg-[#F3EFE9]"
        >
          <ChevronLeft className="h-4 w-4" />
          上一页
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <Button
                key={index}
                onClick={() => onPageChange(page)}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                className={
                  currentPage === page
                    ? 'bg-[#8DA399] hover:bg-[#6B8379] text-white'
                    : 'border-[#E5E0D8] hover:bg-[#F3EFE9]'
                }
              >
                {page}
              </Button>
            ) : (
              <span key={index} className="px-2 text-gray-400">
                {page}
              </span>
            )
          ))}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="border-[#E5E0D8] hover:bg-[#F3EFE9]"
        >
          下一页
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
