"use client";

import Link from "next/link";
import { useAuth } from "@/_contexts/AuthContext";


export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/">Inicio</Link>

      {!isAuthenticated ? (
        <>
          <Link href="/login">Login</Link>

          <Link href="/register">Registro</Link>
        </>
        ) : (
          <>
            <Link href="/flights/create">Crear Vuelo</Link>

            <button onClick={logout}>Cerrar Sesión</button>
          </>
        )}
    </nav>
  );
}
