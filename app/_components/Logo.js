import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link href="/" className="flex items-center gap-2 sm:gap-3">
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="LuxDrive Logo"
          className="rounded-full w-8 h-8 sm:w-12 sm:h-12"
        />
        <h1 className="text-accent-400 font-extrabold text-lg sm:text-2xl tracking-wide">
          LuxDrive
        </h1>
      </Link>
    </div>
  );
}

export default Logo;
