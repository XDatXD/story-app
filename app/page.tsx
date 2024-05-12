import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import ListStory from "@/components/ListStory"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Separator/>
      <ListStory/>
    </div>
  );
}
