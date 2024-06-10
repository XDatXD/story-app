import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Novel as NovelProps } from "@/schema/novel";
import { useRouter } from "next/navigation";
import Link from "next/link";

const StoryCard: React.FC<{ novel: NovelProps }> = ({ novel }) => {
    const router = useRouter();

    function handleClick() {
        const formattedTitle = novel.title.replace(/ /g, "-");
        router.push(`/${formattedTitle}`);
    }

    return (
        <Card
            className="relative transition-transform duration-300 ease-in-out cursor-pointer hover:transform hover:translate-y-[-5px] hover:shadow-lg"
            onClick={handleClick}
        >
            <CardHeader className="p-0">
                <Link href={novel.href}>
                    <Image
                        src={novel.image}
                        alt={novel.title}
                        width={129}
                        height={192}
                        className="object-cover rounded-t-lg w-[100%] h-[100%] lg:w-[129px] lg:h-[192px]"
                    />
                </Link>
            </CardHeader>
            <CardContent
                className="absolute bottom-0 left-0 text-white w-full p-1 rounded-b-lg"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <p className="text-center text-sm">{novel.title}</p>
            </CardContent>
        </Card>
    );
};

export default StoryCard;
