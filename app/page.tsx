"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  // 3 saniye sonra menüye geçiş
  useEffect(() => {
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => router.push("/menu"), 600);
    }, 3000);

    return () => clearTimeout(t);
  }, [router]);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => router.push("/menu"), 400);
  };

  return (
    <main
      onClick={handleEnter}
      className={`min-h-screen w-full bg-black flex items-center justify-center px-4 transition-opacity ${
        fadeOut ? "opacity-0 duration-500" : "opacity-100"
      }`}
    >
      <div className="relative w-full max-w-[520px] h-full max-h-[900px] rounded-[32px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)]">

        {/* --- ARKA PLAN (Sentetik Demo Simgesi) --- */}
        <img
          src="/demo-logo.svg"
          alt="Splash"
          className="w-full h-full object-cover animate-zoomIn"
        />

        {/* --- VINYET --- */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.75)_100%)]"></div>

        {/* --- STEAM (Buhar Efekti) --- */}
        <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none animate-steamMove">
          <img alt="" src="/demo-logo.svg" className="w-full h-full object-cover" />
        </div>

        {/* --- LIGHT LEAK (Altın Işık) --- */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#ffd88a]/35 to-transparent pointer-events-none" />

        {/* --- FILM GRAIN --- */}
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none">
          <img alt="" src="/demo-logo.svg" className="w-full h-full object-cover" />
        </div>

        {/* --- ALTIN ÇERÇEVE --- */}
        <div className="absolute inset-0 rounded-[32px] border-[1.5px] border-[#e4c97f]/70 pointer-events-none"></div>

        {/* --- ALT MARKA YAZISI --- */}
        <div className="absolute bottom-14 inset-x-0 flex justify-center pointer-events-none">
          <p className="text-[13px] tracking-wide text-[#f4d48a] drop-shadow-[0_0_5px_rgba(0,0,0,0.7)]">
            Örnek Mutfak
          </p>
        </div>

        {/* --- ALT GİRİŞ YAZISI --- */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center">
          <p className="text-[11px] text-white/90 bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            Ekrana dokunarak menüye girin.
          </p>
        </div>
      </div>

      {/* --- ANİMASYONLAR --- */}
      <style jsx global>{`
        @keyframes zoomIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.07); }
        }
        .animate-zoomIn { animation: zoomIn 3s ease-out forwards; }

        @keyframes steamMove {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-35px); }
        }
        .animate-steamMove {
          animation: steamMove 5s ease-in-out infinite alternate;
        }
      `}</style>
    </main>
  );
}
