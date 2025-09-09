import Link from "next/link";
import { auth } from "../_lib/auth";

async function Navigation() {
  const session = await auth();

  return (
    <nav>
      <ul className="flex items-center gap-8 text-brand-100 font-medium">
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
        {session?.user ? (
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              account
            </Link>
          </li>
        ) : (
          <Link
            href="/login"
            className="hover:text-accent-400 transition-colors"
          >
            Login
          </Link>
        )}

        <li>
          <Link
            href="/cars"
            className="ml-4 bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Book Now
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
