// app/splash/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/menu");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="h-screen w-full bg-[#120b07] flex items-center justify-center">
      <div className="flex flex-col items-center animate-fadeIn">
        {/* LOGO */}
        <img
          src="/demo-logo.svg"
          alt="Logo"
          className="w-32 h-32 object-contain drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]"
        />

        {/* SLOGAN */}
        <p className="mt-4 text-[#f6dca3] text-sm tracking-wide opacity-80">
          Sentetik QR menü demosu
        </p>

        {/* ALTIN ÇİZGİ */}
        <div className="mt-4 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#d4a544] to-transparent animate-pulse"/>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
