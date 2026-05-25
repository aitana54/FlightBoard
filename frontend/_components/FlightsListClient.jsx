"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:4000";

export default function FlightsListClient({ initialFlights }) {

  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");


  const filteredFlights = useMemo(() => {
    const safeFlights = Array.isArray(initialFlights) ? initialFlights : [];

    return safeFlights.filter((flight) => {

      const matchesSearch = flight.origin.toLowerCase().includes(search.toLowerCase()) ||
        flight.destination.toLowerCase().includes(search.toLowerCase());

      const matchesOrigin =
        origin === "" || flight.origin.toLowerCase().includes(origin.toLowerCase());

      const matchesDestination =
        destination === "" || flight.destination.toLowerCase().includes(destination.toLowerCase());

      return matchesSearch && matchesOrigin && matchesDestination;
    });
  }, [initialFlights, search, origin, destination]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Vuelos
      </h1>

      {/* filtros */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2"
        />

        <input
          type="text"
          placeholder="Filtrar origen"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border p-2"
        />

        <input
          type="text"
          placeholder="Filtrar destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2"
        />
      </div>

      {/* estados */}
      {loading && <p>Buscando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* lista */}
      <div className="space-y-4">
        {filteredFlights.length === 0 && !loading && (
          <p>No hay vuelos</p>
        )}

        {filteredFlights.map((flight) => (
          <div
            key={flight.id}
            className="border rounded p-4 shadow"
          >
            <h2 className="text-xl font-bold">
              {flight.origin} → {flight.destination}
            </h2>

            <p>Estado: {flight.status}</p>

            <p>
              Salida:{" "}
              {isMounted && flight.time_departure
                ? new Date(flight.time_departure).toLocaleString("es-ES")
                : "N/A"}
            </p>

            <Link
              href={`/flights/${flight.id}`}
              className="text-blue-500 underline"
            >
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
