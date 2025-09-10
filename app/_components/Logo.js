import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          alt="LuxDrive Logo"
          className="rounded-full"
        />
        <h1 className="text-accent-400 font-extrabold text-2xl tracking-wide">
          LuxDrive
        </h1>
      </Link>
    </div>
  );
}

export default Logo;
