"use client";

import { useState } from "react";
import { useAuth } from "@/_contexts/AuthContext";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function FlightDetailClient({ flight }) {
  const { isAuthenticated, token } = useAuth();

  const router = useRouter();


  const [origin, setOrigin] = useState(flight?.origin ?? "");
  const [destination, setDestination] = useState(flight?.destination ?? "");
  const [status, setStatus] = useState(flight?.status ?? "");


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
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/v1/flights/${flight.id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error("Error eliminando el vuelo");
      }

      alert("Vuelo eliminado correctamente");
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles del vuelo</h1>

      <div className="space-y-2">
        <p>
          <strong>Origen:</strong> {flight.origin}
        </p>
        <p>
          <strong>Destino:</strong> {flight.destination}
        </p>
        <p>
          <strong>Status:</strong> {flight.status}
        </p>
      </div>

      {isAuthenticated && (
        <div className="mt-6 space-y-4">
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="border p-2"
          />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border p-2"
          />

          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2"
          />

          <div className= "flex gap-4">
            <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2">
              Actualizar
            </button>

            <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}

      {loading && <p>Cargando...</p>}

      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </main>
  );
}
