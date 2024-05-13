import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import ListStory from "@/components/ListStory"
import NewStoryList from "@/components/NewStoryList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Separator/>
      <ListStory/>
      <NewStoryList/>
      <Footer/>
    </div>
  );
}
