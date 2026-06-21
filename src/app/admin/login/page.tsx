"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { adminLogin, isAdminLoggedIn } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) {
      router.replace("/admin");
    }
  }, [router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const ok = adminLogin(email.trim(), password);
      if (ok) {
        router.push("/admin");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page px-5">
      {/* Background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(12,13,17,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(12,13,17,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none fixed -top-40 left-1/4 size-96 rounded-full bg-cobalt/7"
        style={{ filter: "blur(80px)" }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-cobalt font-mono text-lg font-bold text-white shadow-[0_12px_32px_rgba(59,95,232,0.28)]">
            CV
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-ink">Admin access</h1>
            <p className="mt-1 text-sm text-ink/50">Portfolio blog management</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-float">
          <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-cobalt/15 bg-cobalt/4 px-4 py-3">
            <ShieldCheck className="size-4 shrink-0 text-cobalt" />
            <div>
              <p className="text-[0.78rem] font-bold text-cobalt">Demo credentials</p>
              <p className="text-[0.72rem] text-cobalt/70">admin@portfolio.com / admin123</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink/70">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/36" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@portfolio.com"
                  required
                  autoComplete="email"
                  className="h-11 w-full rounded-xl border border-ink/10 bg-page pl-10 pr-4 text-sm text-ink placeholder:text-ink/32 focus:border-cobalt/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/10 transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink/70">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/36" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="h-11 w-full rounded-xl border border-ink/10 bg-page pl-10 pr-11 text-sm text-ink placeholder:text-ink/32 focus:border-cobalt/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cobalt/10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-coral/20 bg-coral/5 px-4 py-2.5 text-sm font-semibold text-coral">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-xl bg-cobalt text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cobalt/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-ink/36">
          Portfolio admin · Frontend-only authentication
        </p>
      </div>
    </div>
  );
}
