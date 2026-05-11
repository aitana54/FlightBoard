"use client";

import { useAuth } from "../_contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated, dispatch } = useAuth();
  const router = useRouter();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return (
    <header style={{ display: "flex", gap : "10px" }}>
      <h3>FlightBoard</h3>

      {isAuthenticated && (
        <button onClick={logout}>Logout</button>
      )}
    </header>
  );
}
