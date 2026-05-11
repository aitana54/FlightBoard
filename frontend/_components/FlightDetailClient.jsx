"use client";

import { useState } from "react";
import { useAuth } from "@/_contexts/AuthContext";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000";

export default function FlightDetailClient({ flight }) {
  const { isAuthenticated, token } = useAuth();

  const router = useRouter();

  const [origin, setOrigin] = useState(flight.origin);
  const [destination, setDestination] = useState(flight.destination);
  const [status, setStatus] = useState(flight.status);

  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/v1/flights/${flight.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ origin, destination, status })
        }
      );

      if (!res.ok) {
        throw new Error("Error actualizando el vuelo");
      }

      alert("Vuelo actualizado correctamente");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
}
