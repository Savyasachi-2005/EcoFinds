import React, { useState } from "react";
import "./auth.css";

const SignInInitial = { email: "", password: "", remember: false };
const SignUpInitial = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthPage({ apiBase = "" }) {
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [signIn, setSignIn] = useState(SignInInitial);
  const [signUp, setSignUp] = useState(SignUpInitial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const api = (path) => `${apiBase}${path}`;

  const validateSignIn = () => {
    if (!signIn.email) return "Email is required";
    if (!signIn.password) return "Password is required";
    return null;
  };

  const validateSignUp = () => {
    if (!signUp.username) return "Username is required";
    if (!signUp.email) return "Email is required";
    if (!signUp.password) return "Password is required";
    if (signUp.password.length < 6)
      return "Password must be at least 6 characters";
    if (signUp.password !== signUp.confirmPassword)
      return "Passwords do not match";
    return null;
  };

  async function handleSignIn(e) {
    e.preventDefault();
    setError("");
    const v = validateSignIn();
    if (v) return setError(v);

    setLoading(true);
    try {
      const res = await fetch(api("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signIn.email,
          password: signIn.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Sign in failed");
      // save token (demo)
      sessionStorage.setItem("token", data.token);
      // redirect or update app state
      window.location.href = "/app";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    const v = validateSignUp();
    if (v) return setError(v);

    setLoading(true);
    try {
      const res = await fetch(api("/api/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUp.username,
          email: signUp.email,
          password: signUp.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Sign up failed");
      sessionStorage.setItem("token", data.token);
      window.location.href = "/app";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100svh-4rem)] bg-gray-50 flex items-center justify-center px-4 py-2 md:py-4">
      <div className="w-full max-w-xl md:max-w-3xl lg:max-w-4xl auth-card grid grid-cols-1 md:grid-cols-2 md:overflow-hidden">
        {/* Branding / toggle */}
        <div className="p-6 md:p-8 auth-gradient text-white flex flex-col md:min-h-[28rem]">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">EcoFinds</h1>
            <p className="mt-2 text-sm opacity-90">
              Sustainable second-hand marketplace — join the circular economy.
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex gap-3">
              <button
                onClick={() => setMode("signin")}
                className={`auth-toggle ${
                  mode === "signin" ? "is-active" : ""
                }`}
                aria-pressed={mode === "signin"}
              >
                Sign in
              </button>

              <button
                onClick={() => setMode("signup")}
                className={`auth-toggle ${
                  mode === "signup" ? "is-active" : ""
                }`}
                aria-pressed={mode === "signup"}
              >
                Create account
              </button>
            </div>

            <p className="mt-4 text-xs opacity-90">
              Built for hackathons — fast, mobile friendly, and demo-ready.
            </p>
          </div>
        </div>

        {/* Form area */}
        <div className="p-6 md:p-8">
          {error && (
            <div
              className="mb-4 text-sm auth-error p-3"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          {mode === "signin" ? (
            <form
              onSubmit={handleSignIn}
              className="space-y-4"
              autoComplete="on"
            >
              <h2 className="text-xl md:text-2xl font-semibold">
                Sign in to your account
              </h2>

              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  value={signIn.email}
                  onChange={(e) =>
                    setSignIn({ ...signIn, email: e.target.value })
                  }
                  required
                  autoComplete="email"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    value={signIn.password}
                    onChange={(e) =>
                      setSignIn({ ...signIn, password: e.target.value })
                    }
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={signIn.remember}
                    onChange={(e) =>
                      setSignIn({ ...signIn, remember: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-sm text-emerald-600 underline"
                >
                  Create account
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 auth-btn-primary"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSignUp}
              className="space-y-4"
              autoComplete="on"
            >
              <h2 className="text-xl md:text-2xl font-semibold">
                Create your account
              </h2>

              <label className="block">
                <span className="text-sm font-medium">Username</span>
                <input
                  type="text"
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  value={signUp.username}
                  onChange={(e) =>
                    setSignUp({ ...signUp, username: e.target.value })
                  }
                  required
                  autoComplete="username"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  value={signUp.email}
                  onChange={(e) =>
                    setSignUp({ ...signUp, email: e.target.value })
                  }
                  required
                  autoComplete="email"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium">Password</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    value={signUp.password}
                    onChange={(e) =>
                      setSignUp({ ...signUp, password: e.target.value })
                    }
                    required
                    autoComplete="new-password"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium">Confirm password</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    value={signUp.confirmPassword}
                    onChange={(e) =>
                      setSignUp({ ...signUp, confirmPassword: e.target.value })
                    }
                    required
                    autoComplete="new-password"
                  />
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="show-password-signup"
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="show-password-signup" className="text-sm">
                  Show passwords
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 auth-btn-primary"
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </div>

              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-sm text-emerald-600 underline"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
