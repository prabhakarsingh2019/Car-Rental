"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import PasswordInput from "./PasswordInput";

function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  function validateForm() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

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

  async function handleSignup(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      toast.success("Signup successful! Please login.");
      router.push("/login");
    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSignup} className="space-y-4" noValidate>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-brand-600 bg-brand-950 text-white focus:ring-2 focus:ring-accent-500 outline-none"
        />
        {errors.name && <p className="text-red-500 text-md">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-brand-600 bg-brand-950 text-white focus:ring-2 focus:ring-accent-500 outline-none"
        />
        {errors.email && <p className="text-red-500 text-md">{errors.email}</p>}
      </div>

      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-accent-500 hover:bg-accent-400 text-brand-900 font-semibold transition"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignInForm;
