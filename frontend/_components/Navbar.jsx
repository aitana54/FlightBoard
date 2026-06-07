"use client";

import Link from "next/link";
import { useAuth } from "@/_contexts/AuthContext";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const { isAuthenticated, dispatch } = useAuth();
  const router = useRouter();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="logo">
        FlightBoard
      </Link>

      <div className="links">
        {!isAuthenticated ? (
          <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Registro
              </Link>
          </>
          ) : (
            <>
              <button onClick={logout} className="button">
                Cerrar Sesión
              </button>
            </>
          )}
      </div>
    </nav>
  );
}
