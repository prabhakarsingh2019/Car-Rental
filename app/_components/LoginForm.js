"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { signIn } from "next-auth/react";
import PasswordInput from "./PasswordInput";
function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  function validateForm() {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password =
        "Password must contain at least 1 uppercase letter and 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      if (res?.error) {
        toast.error(res.error || "Invalid credentials");
      } else {
        toast.success("Login successful!");
        router.push("/account");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm bg-brand-900 p-6 rounded-xl shadow-lg space-y-4"
      noValidate
    >
      <div className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg border border-brand-600 bg-brand-950 text-white focus:ring-2 focus:ring-accent-500 outline-none"
        />
        {errors.email && <p className="text-red-500 text-md">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
