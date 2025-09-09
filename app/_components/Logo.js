import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        width={80}
        height={80}
        alt="LuxDrive Logo"
        className="rounded-full"
      />
      <h1 className="text-accent-400 font-extrabold text-2xl tracking-wide">
        LuxDrive
      </h1>
    </div>
  );
}

export default Logo;
