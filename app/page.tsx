import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar/>
    </div>
  );
}
