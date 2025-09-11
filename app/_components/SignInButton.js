"use server";
import Image from "next/image";
import { signInAction } from "@/app/_lib/action";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium bg-brand-950 text-brand-50 rounded-xl hover:bg-brand-900 transition">
        <div className="relative w-6 h-6">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            fill
            sizes="24px"
            className="object-contain"
          />
        </div>
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
