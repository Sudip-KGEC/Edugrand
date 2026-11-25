import { useState } from "react";
import { Navigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { admin, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/" replace />;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-ink p-5" style={{ backgroundImage: "radial-gradient(40rem 24rem at 90% 0%, rgba(255,106,0,.4), transparent 70%)" }}>
      <form onSubmit={submit} className="fade-up w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
        <span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-white">
          <GraduationCap className="size-6" />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold">
          Edu<span className="text-brand">Grand</span> admin
        </h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage scholarships and inquiries.</p>

        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Email</span>
            <input className="field" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Password</span>
            <input className="field" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>

        {error ? (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn btn-primary mt-7 w-full !py-3" disabled={loading}>
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
