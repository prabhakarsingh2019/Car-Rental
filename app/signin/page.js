import Link from "next/link";
import SignInButton from "../_components/SignInButton";
import SignInForm from "../_components/SignInForm";
export const metadata = {
  title: "Signin",
};
export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-950 text-brand-50 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">
        Create your account
      </h2>

      <div className="mb-6">
        <SignInButton />
      </div>

      <div className="flex items-center w-full max-w-sm mb-6">
        <div className="flex-grow border-t border-brand-700" />
        <span className="mx-3 text-sm text-brand-400">or</span>
        <div className="flex-grow border-t border-brand-700" />
      </div>

      <div className="w-full max-w-sm mb-6">
        <SignInForm />
      </div>

      <p className="text-center text-brand-400 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-accent-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
