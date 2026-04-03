import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ fontFamily: "var(--font-outfit, 'Outfit'), -apple-system, sans-serif" }}
    >
      <div className="text-center">
        <div className="text-[120px] font-extrabold text-[#000088]/10 leading-none select-none">
          404
        </div>
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-[#1D1D1F] -mt-4 mb-4">
          Hier ist nichts.
        </h1>
        <p className="text-[16px] text-[#86868B] mb-8 max-w-md mx-auto">
          Die Seite existiert nicht — aber dein AI-Team wartet auf dich.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/landing"
            className="px-6 py-3 bg-[#000088] text-white text-[14px] font-semibold rounded-xl hover:bg-[#000066] transition-all"
          >
            Zur Landing Page
          </Link>
          <Link
            href="/landing/blog"
            className="px-6 py-3 bg-[#F5F5F7] text-[#1D1D1F] text-[14px] font-semibold rounded-xl border border-[#E5E5EA] hover:border-[#000088] hover:text-[#000088] transition-all"
          >
            Blog lesen
          </Link>
        </div>
      </div>
    </div>
  );
}
