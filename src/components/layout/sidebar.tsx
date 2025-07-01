"use client";
import { useMediaQuery } from 'react-responsive';
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Plus, 
  CheckCircle, 
  Calendar, 
  BarChart3, 
  User, 
  Menu,
  X,
  Cat
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Add Task", href: "/tasks/new", icon: Plus },
  { name: "All Tasks", href: "/tasks", icon: Calendar },
  { name: "Completed", href: "/tasks/completed", icon: CheckCircle },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const slideX = isDesktop ? 0 : isOpen ? 0 : -100;


  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
      initial={false}
      animate={{ x: slideX }}
      transition={ isDesktop ? undefined : { type: "spring", stiffness: 300, damping: 30 } }
       className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-lg",
          "transform transition-transform duration-300",
          // mobile: slide it in/out
          isOpen ? "translate-x-0" : "-translate-x-full",
          // desktop: always visible, no transform
          "lg:static lg:translate-x-0 lg:shadow-none lg:border-none lg:transform-none lg:w-64",
          "fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-lg",
           isDesktop && "static translate-x-0 z-0"
      )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Cat/>
            <h1 className="text-xl font-bold text-gray-900">TodoApp</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12",
                    isActive && "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                  onClick={() => {
                    router.push(item.href);
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2025 TodoApp
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}