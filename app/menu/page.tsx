// app/dvu-altindag/page.tsx
"use client";

import { useState } from "react";
import { demoMenu as menu } from "@/data/demo-menu";

// Menüde kullandığımız item tipi
type MenuItem = {
  id: string;
  name: string;
  size?: string;
  description?: string;
  price: number;
  allergens?: string[];
  isSignature?: boolean;
  image?: string;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);

export default function MenuPage() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    menu.categories[0].id
  );
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const activeCategory =
    menu.categories.find((c) => c.id === activeCategoryId) ??
    menu.categories[0];

  return (
    <main className="min-h-screen bg-[#f3ede3] text-[#2b1a10] flex justify-center">
      <div className="w-full max-w-md px-4 py-6 sm:px-5 sm:py-8">
        {/* PANEL */}
        <div className="relative bg-white rounded-3xl border border-[#e4dacb] shadow-[0_18px_45px_rgba(0,0,0,0.06)] px-6 py-6">
          {/* Üstte hafif ışık efekti */}
          <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-white/70 to-transparent" />

          {/* HEADER + LOGO + HERO */}
          <header className="relative z-10 flex flex-col items-center pb-5 border-b border-[#e4dacb]">
            <div className="h-20 w-20 mb-2">
              <img
                src="/demo-logo.svg"
                alt="Örnek Mutfak demo logosu"
                className="h-full w-full object-contain"
              />
            </div>

            <h1 className="text-xl font-semibold tracking-wide text-[#3b2418]">
              {menu.restaurant.name}
            </h1>

            <p className="mt-1 text-xs text-neutral-500">
              Sentetik Demo • QR Menü
            </p>

            {/* Slogan / hero metni */}
            <p className="mt-2 text-[11px] text-neutral-500 italic text-center">
              Kategorileri ve ürün detaylarını keşfedin.
            </p>
          </header>

          {/* KATEGORİLER – sticky bar */}
          <div className="sticky top-0 z-20 -mx-6 mt-3 bg-white/92 backdrop-blur-sm border-b border-[#f0e7d8]">
            <div className="px-6 pt-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {menu.categories.map((cat) => {
                const active = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={
                      "px-4 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap border transition-all " +
                      (active
                        ? "bg-[#3b2418] text-white border-[#3b2418] shadow-[0_4px_12px_rgba(59,36,24,0.45)]"
                        : "bg-[#f9f5ee] text-[#3b2418] border-[#dfd4c3] hover:border-[#c9bca8]")
                    }
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kategori başlığı */}
          <div className="mt-3 flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold tracking-wide">
              {activeCategory.name}
            </h2>
            <span className="text-[10px] text-neutral-500">
              {activeCategory.items.length} ürün
            </span>
          </div>

          {/* ÜRÜNLER */}
          <div className="space-y-4">
            {activeCategory.items.map((item: MenuItem) => (
              <article
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white border border-[#e5ddcf] rounded-2xl px-3 py-3 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all cursor-pointer"
              >
                <div className="flex gap-3">
                  {/* Ürün fotoğrafı varsa göster */}
                  {item.image && (
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover aspect-square"
                      />
                    </div>
                  )}

                  <div className="flex-1 flex justify-between gap-3">
                    <div>
                      <div className="flex gap-1 flex-wrap items-center">
                        <p className="text-sm font-semibold">{item.name}</p>
                        {item.size && (
                          <span className="text-xs text-neutral-500">
                            • {item.size}
                          </span>
                        )}
                        {item.isSignature && (
                          <span className="text-[9px] bg-[#f0ede6] text-[#2b1a10] px-2 py-0.5 rounded-full">
                            Öne çıkan
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="mt-1 text-xs text-neutral-600 leading-snug">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-[#8b2e1c] whitespace-nowrap">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                {/* alerjenler */}
                {item.allergens && item.allergens.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.allergens.map((a) => (
                      <span
                        key={a}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0ede6] text-[#4a3a2a]"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-8 pt-3 border-t border-[#e4dacb] text-[11px] text-neutral-500 leading-snug">
            <p>{menu.restaurant.address}</p>
            <p>{menu.restaurant.phone}</p>

            {/* Alerjen bilgilendirme notu */}
            <p className="mt-2">
              Alerjenler hakkında detaylı bilgi için lütfen personelimize
              danışınız.
            </p>

            {/* Sosyal / web bilgisi – metni istersen değiştirirsin */}
            <p className="mt-1">Bu menüdeki fiyatlar sentetiktir.</p>
            <p>Gerçek bir işletmenin menüsü değildir.</p>

            {/* Son güncelleme tarihi */}
            <p className="mt-1 text-[10px]">
              Sentetik demo; gerçek işletme bilgisi içermez.
            </p>
          </div>
        </div>
      </div>

      {/* ÜRÜN DETAY MODALİ */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="max-w-sm w-full bg-white rounded-3xl shadow-2xl border border-[#e4dacb] p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-3 text-xs text-neutral-500 hover:text-neutral-700"
            >
              Kapat ✕
            </button>

            {/* Görsel */}
            {selectedItem.image && (
              <div className="mb-3 rounded-2xl overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full max-h-60 object-cover"
                />
              </div>
            )}

            {/* Başlık + fiyat */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-base font-semibold text-[#3b2418]">
                  {selectedItem.name}
                </h3>
                {selectedItem.size && (
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {selectedItem.size}
                  </p>
                )}
              </div>
              <p className="text-sm font-bold text-[#8b2e1c]">
                {formatPrice(selectedItem.price)}
              </p>
            </div>

            {/* Açıklama */}
            {selectedItem.description && (
              <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                {selectedItem.description}
              </p>
            )}

            {/* Alerjenler */}
            {selectedItem.allergens && selectedItem.allergens.length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] font-semibold text-[#3b2418] mb-1">
                  Alerjen Bilgisi
                </p>
                <div className="flex flex-wrap gap-1">
                  {selectedItem.allergens.map((a) => (
                    <span
                      key={a}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0ede6] text-[#4a3a2a]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-1 text-[10px] text-neutral-500">
              Ürün görseli temsili olabilir. Detaylı bilgi için personelimize
              danışabilirsiniz.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
