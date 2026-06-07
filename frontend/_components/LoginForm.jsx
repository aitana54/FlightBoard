"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/_contexts/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const router = useRouter();
  const { dispatch } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const baseUrl = API || "http://localhost:4000";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${baseUrl}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`El servidor no devolvió JSON. Código de estado: ${response.status}`);
      }

      const data = await response.json();
      const payload = data.data || data;

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      const successMessage = data.message || "Has iniciado sesión correctamente.";
      setSuccess(successMessage);

      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify({ email: payload.email }));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: { email: payload.email },
          token: payload.token,
        },
      });

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err) {
      console.log("Error completo capturado:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="flex flex-col gap-4 max-w-md"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="border p-2"
        required
      />

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {success && (
        <p className="text-green-500">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="border p-2"
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
