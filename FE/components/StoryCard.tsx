"use client";

import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface StoryCardProps {
    title: string;
    imageUrl: string;
    isFull: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, imageUrl, isFull }) => {
    return (
        <Card className="relative transition-transform duration-300 ease-in-out cursor-pointer hover:transform hover:translate-y-[-5px] hover:shadow-lg">
            <CardHeader>
                <Image src={imageUrl} alt={title} width={400} height={225} className="object-cover rounded-t-lg" />
                {isFull && (
                    <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        FULL
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <CardTitle>{title}</CardTitle>
            </CardContent>
        </Card>
    );
};

export default StoryCard;
