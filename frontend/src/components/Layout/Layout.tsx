import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children?: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="flex h-screen w-full bg-main text-primary overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header / Top Bar */}
        <header className="absolute top-0 right-0 p-6 z-10 flex justify-end">
          <ThemeToggle />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto w-full h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
