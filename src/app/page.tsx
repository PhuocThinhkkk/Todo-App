
"use client"; // Đây là client-side component
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const cookies = new Cookies();
  const isSignedIn = !!cookies.get("auth-token");

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      router.push("/user");
    }
  }, [isSignedIn, router]); // useEffect chỉ chạy khi component mount

  return <div>Loading...</div>;
}
