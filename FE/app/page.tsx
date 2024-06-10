import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import { MainApp } from "@/components/MainApp";

export default function Home() {
    return (
        <div>
            <Navbar />
            <Separator />
            <MainApp />
            <Footer />
        </div>
    );
}
