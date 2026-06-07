"use client";
import LoginForm from "@/_components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Iniciar sesión
        </h1>

        <LoginForm />
      </div>
    </div>
  );
}
