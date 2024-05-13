"use client"

import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import styled from 'styled-components';

interface StoryCardProps {
    title: string;
    imageUrl: string;
    isFull: boolean;
}

const StyledCard = styled(Card)`
  position: relative;
  transition: transform 0.3s ease-in-out;
    cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const StoryCard: React.FC<StoryCardProps> = ({ title, imageUrl, isFull }) => {
    return (
        <StyledCard>
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
        </StyledCard>
    );
};

export default StoryCard;