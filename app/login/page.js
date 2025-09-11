import SignInButton from "../_components/SignInButton";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-950 text-brand-50 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}
