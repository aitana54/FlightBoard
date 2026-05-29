"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/_contexts/AuthContext";


const API = process.env.NEXT_PUBLIC_API_URL ??
"http://127.0.0.1:4000";


export default function Login() {
  const router = useRouter();

  const {dispatch} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Credenciales Incorrectas");
      }

      const data = await res.json();

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: data.token,
          user: data.user
        },
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email: data.email }));
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex-center justify-center">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {loading ? "Entrando..." : "Login"}
        </button>
        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
