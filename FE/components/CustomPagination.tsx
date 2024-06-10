import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const CustomPagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}> = ({ currentPage, totalPages, onChangePage }) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationPrevious
                    onClick={() =>
                        onChangePage(Math.max(1, currentPage - 1))
                    }
                    className={`cursor-pointer ${
                        currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                    }`}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => onChangePage(page)}
                                className="cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}
                <PaginationNext
                    onClick={() =>
                        onChangePage(Math.min(totalPages, currentPage + 1))
                    }
                    className={`cursor-pointer ${
                        currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                    }`}
                />
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;