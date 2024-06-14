import { Genre } from "@/schema/Genre";
import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import GenreItem from "./GenreItem";

const AccordionGenreList: React.FC<{ items?: Genre[] }> = ({ items }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="accordionGenre">
                <AccordionTrigger>Thể loại</AccordionTrigger>
                <ul>
                    {items?.slice(1).map((item) => (
                        <AccordionContent key={item.href}>
                            <GenreItem genre={item} />
                        </AccordionContent>
                    ))}
                </ul>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionGenreList;
