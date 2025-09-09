"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "../_lib/action";

const navItems = [
  { name: "Profile", href: "/account" },
  { name: "My Bookings", href: "/account/bookings" },
  { name: "Update Profile", href: "/account/update" },
];

export default function AsideNav({ children }) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-brand-800 h-viewport flex flex-col">
      <h2 className="text-xl font-bold px-4 py-3 ">My Account</h2>

      <nav className="flex flex-col">
        {navItems.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-4 py-2 my-4 ml-4 text-lg font-medium transition-all delay-400 
              ${
                isActive
                  ? "bg-brand-900 text-brand-50 border-brand-900 border-l-2 border-t-2 border-b-2  rounded-l-md "
                  : "text-brand-400 hover:bg-brand-950 hover:border-brand-950 hover:border-l-2 hover:border-t-2 hover:border-b-2  hover:rounded-l-md"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>

      <form action={signOutAction} className="w-60 mt-3">
        <button
          type="submit"
          className="px-4 py-2  ml-4 text-lg font-medium transition-all delay-400 text-brand-400 hover:bg-brand-950 hover:border-brand-950 hover:border-l-2 hover:border-t-2 hover:border-b-2 hover:rounded-l-md w-full text-left"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
