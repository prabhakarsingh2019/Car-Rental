"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "../_lib/action";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Profile", href: "/account" },
  { name: "My Bookings", href: "/account/bookings" },
  // { name: "Update Profile", href: "/account/update" },
];

export default function AsideNav({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sm:hidden  bg-brand-800 px-4 py-3 border-b border-brand-700">
        <button
          onClick={() => setOpen(!open)}
          className="text-brand-50 focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`fixed sm:static top-0 left-0 z-50 h-full sm:h-auto w-64 bg-brand-800 flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <h2 className="hidden sm:block text-xl font-bold px-4 py-3 text-brand-50">
          My Account
        </h2>

        <nav className="flex flex-col mt-4">
          {navItems.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`px-4 py-2 my-2 ml-4 text-lg font-medium transition-all duration-200 
                  ${
                    isActive
                      ? "bg-brand-900 text-brand-50 border-brand-900 border-l-2 border-t-2 border-b-2 rounded-l-md"
                      : "text-brand-400 hover:bg-brand-950 hover:border-brand-950 hover:border-l-2 hover:border-t-2 hover:border-b-2 hover:rounded-l-md"
                  }`}
                onClick={() => setOpen(false)}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>

        <form action={signOutAction} className="mt-auto px-4 py-4 sm:mt-3">
          <button
            type="submit"
            className="px-4 py-2 text-lg font-medium w-full text-left transition-all duration-200 text-brand-400 hover:bg-brand-950 hover:border-brand-950 hover:border-l-2 hover:border-t-2 hover:border-b-2 hover:rounded-l-md"
            onClick={() => setOpen(false)}
          >
            Sign Out
          </button>
        </form>
      </div>
    </>
  );
}
