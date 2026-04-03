"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Users,
  ClipboardList,
  Target,
  Wallet,
  Plug,
  Activity,
  Settings,
  Menu,
  X,
} from "lucide-react";

/* ── Company Context ──────────────────────────────────────────────────── */

type CompanyContextValue = {
  companyId: string | null;
  companyName: string | null;
  loading: boolean;
};

const CompanyContext = createContext<CompanyContextValue>({
  companyId: null,
  companyName: null,
  loading: true,
});

export function useCompany() {
  return useContext(CompanyContext);
}

/* ── Nav Items ────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { href: "/dashboard", label: "Übersicht", icon: Building2, exact: true },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/aufgaben", label: "Aufgaben", icon: ClipboardList },
  { href: "/dashboard/ziele", label: "Ziele", icon: Target },
  { href: "/dashboard/finanzen", label: "Finanzen", icon: Wallet },
  { href: "/dashboard/connectors", label: "Connectors", icon: Plug },
  { href: "/dashboard/aktivitaet", label: "Aktivität", icon: Activity },
  { href: "/dashboard/einstellungen", label: "Einstellungen", icon: Settings },
];

/* ── Layout ───────────────────────────────────────────────────────────── */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Load first company */
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/companies");
        if (!res.ok) return;
        const { companies } = await res.json();
        if (companies?.length) {
          setCompanyId(companies[0].id);
          setCompanyName(companies[0].name);
        }
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = useCallback(
    (href: string, exact?: boolean) =>
      exact ? pathname === href : pathname.startsWith(href),
    [pathname]
  );

  /* Sidebar content (shared between desktop + mobile) */
  const navContent = (
    <nav className="flex flex-col gap-1 px-2 py-3">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href, item.exact);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[#000088] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <CompanyContext.Provider value={{ companyId, companyName, loading }}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* ── Desktop Sidebar ─────────────────────────────────────────── */}
        <aside className="hidden md:flex md:w-56 md:flex-col md:border-r md:border-gray-200 md:bg-white">
          {/* Logo */}
          <div className="flex h-14 items-center gap-2.5 border-b border-gray-200 px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#000088]">
              <span className="text-sm font-extrabold text-white">K</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-gray-900">
              KaderOS
            </span>
          </div>

          {/* Nav */}
          <div className="flex-1 overflow-y-auto">{navContent}</div>

          {/* Company badge */}
          {companyName && (
            <div className="border-t border-gray-200 px-4 py-3">
              <p className="truncate text-xs font-medium text-gray-500">
                {companyName}
              </p>
            </div>
          )}
        </aside>

        {/* ── Mobile Top Bar ──────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4 md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#000088]">
              <span className="text-xs font-extrabold text-white">K</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              KaderOS
            </span>
          </header>

          {/* Mobile slide-over menu */}
          {mobileOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/20 md:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:hidden">
                <div className="flex h-14 items-center gap-2.5 border-b border-gray-200 px-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#000088]">
                    <span className="text-sm font-extrabold text-white">K</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    KaderOS
                  </span>
                </div>
                {navContent}
              </div>
            </>
          )}

          {/* ── Page Content ────────────────────────────────────────── */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </CompanyContext.Provider>
  );
}
