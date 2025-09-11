"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { auth } from "../_lib/auth";

export default function Navigation({ session }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative">
      <div className="sm:hidden flex items-center">
        <button
          onClick={() => setOpen(!open)}
          className="text-brand-100 focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <ul className="sm:hidden absolute right-0 mt-3 w-48 bg-brand-900 rounded-lg shadow-lg flex flex-col items-center gap-4 py-4 z-50">
          <li>
            <Link
              href="/"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/cars"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              Cars
            </Link>
          </li>
          <li>
            <Link
              href={session?.user ? "/account" : "/login"}
              className="hover:text-accent-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              {session?.user ? "Account" : "Login"}
            </Link>
          </li>
          <li>
            <Link
              href="/cars"
              className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg shadow-md transition"
              onClick={() => setOpen(false)}
            >
              Book Now
            </Link>
          </li>
        </ul>
      )}

      {/* Desktop menu */}
      <ul className="hidden sm:flex items-center gap-8 text-brand-100 font-medium">
        <li>
          <Link href="/" className="hover:text-accent-400 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/cars"
            className="hover:text-accent-400 transition-colors"
          >
            Cars
          </Link>
        </li>
        <li>
          <Link
            href={session?.user ? "/account" : "/login"}
            className="hover:text-accent-400 transition-colors"
          >
            {session?.user ? "Account" : "Login"}
          </Link>
        </li>
        <li>
          <Link
            href="/cars"
            className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Book Now
          </Link>
        </li>
      </ul>
    </nav>
  );
}
