import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen dark:bg-[#1F1F1F]">
            <Navbar />
            <Separator />
            {children}
            <Footer />
            <Toaster />
        </div>
    );
};

export default RootLayout;
