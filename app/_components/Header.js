import { auth } from "../_lib/auth";
import Logo from "./Logo";
import Navigation from "./Navigation";

async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-900 font-medium border-b border-brand-700 shadow-md">
      <div className="max-w-9xl mx-auto flex items-center justify-between px-4 py-3">
        <Logo />
        <Navigation session={session} />
      </div>
    </header>
  );
}

export default Header;
