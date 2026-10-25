import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { PageMetadata } from "@/components/PageMetadata";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <PageMetadata />
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </MotionConfig>
);

export default App;
