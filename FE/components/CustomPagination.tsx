import React from "react";
import { Pagination, Button } from "@nextui-org/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";

const CustomPagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}> = ({ currentPage, totalPages, onChangePage }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                size="sm"
                variant="flat"
                color="secondary"
                className={`${
                    currentPage === 1
                        ? "cursor-not-allowed opacity-50 pointer-events-none"
                        : ""
                }`}
                onPress={() => onChangePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                Previous
            </Button>
            <Pagination
                total={totalPages}
                color="secondary"
                page={currentPage}
                onChange={onChangePage}
            />
            <Button
                size="sm"
                variant="flat"
                color="secondary"
                className={`${
                    currentPage === totalPages
                        ? "cursor-not-allowed opacity-50 pointer-events-none"
                        : ""
                }`}
                onPress={() =>
                    onChangePage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
            <Select onValueChange={(value) => onChangePage(Number(value))}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select a page</SelectLabel>
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((page) => (
                            <SelectItem
                                key={page}
                                value={page.toString()}
                            >{`Page ${page}`}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default CustomPagination;
