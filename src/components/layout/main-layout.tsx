"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/lib/stores/auth-store";
import { UserService } from "@/lib/services/user-service";
import { Sidebar } from "./sidebar";
import { Toaster } from "react-hot-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const { setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (firebaseUser) {
        try {
          const user = await UserService.getUser(firebaseUser.uid);
          if (user) {
            setUser(user);
          } else {
            router.push("/auth/signin");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          router.push("/auth/signin");
        }
      } else {
        setUser(null);
        router.push("/auth/signin");
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}