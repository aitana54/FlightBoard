"use client";

import { useState } from "react";
import { useAuth } from "@/_contexts/AuthContext";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function FlightDetailClient({ flight }) {
  const { isAuthenticated, token } = useAuth();

  const router = useRouter();


  const [origin, setOrigin] = useState(flight?.origin ?? "");
  const [destination, setDestination] = useState(flight?.destination ?? "");
  const [status, setStatus] = useState(flight?.status ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const extractErrorMessage = async (res, fallback) => {
    let message = fallback;
    try {
      const data = await res.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Si no se pudo parsear el JSON, mantenemos el mensaje de fallback
    }
    return message;
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setSuccess("");

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
        const message = await extractErrorMessage(res, "Error actualizando el vuelo");
        throw new Error(message);
      }

      setError("");
      setSuccess("Vuelo actualizado correctamente");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setSuccess("");

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
        const message = await extractErrorMessage(res, "Error eliminando el vuelo");
        throw new Error(message);
      }

      setError("");
      alert("Vuelo eliminado correctamente");
      router.push("/");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles del vuelo</h1>

      <div className="space-y-2">
        <p>
          <strong>Origen:</strong> {origin}
        </p>
        <p>
          <strong>Destino:</strong> {destination}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </div>

      {isAuthenticated && (
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-white">Origen</span>
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="mt-1 block w-full border p-2"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-white">Destino</span>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 block w-full border p-2"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-white">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full border p-2 bg-zinc-950"
            >
              <option value="">Selecciona un estado</option>
              <option value="on-time">on-time</option>
              <option value="delayed">delayed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </label>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
            >
              Actualizar
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 disabled:opacity-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}

      {loading && <p>Cargando...</p>}

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </main>
  );
}
