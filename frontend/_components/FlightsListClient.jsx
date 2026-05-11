"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:4000";

export default function FlightsListClient({ initialFlights }) {
  // 🔥 siempre array (evita crashes)
  const [flights, setFlights] = useState(initialFlights ?? []);

  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);


  // 🔥 filtrado seguro (SIN crashes)
  const filteredFlights = useMemo(() => {
    const safeFlights = Array.isArray(flights) ? flights : [];

    return safeFlights.filter((flight) => {
      const originText = flight.origin?.toLowerCase() || "";
      const destinationText = flight.destination?.toLowerCase() || "";
      const searchText = search.toLowerCase();
      const originFilter = origin.toLowerCase();
      const destinationFilter = destination.toLowerCase();

      const matchesSearch =
        originText.includes(searchText) ||
        destinationText.includes(searchText);

      const matchesOrigin =
        origin === "" || originText.includes(originFilter);

      const matchesDestination =
        destination === "" || destinationText.includes(destinationFilter);

      return matchesSearch && matchesOrigin && matchesDestination;
    });
  }, [flights, search, origin, destination]);

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
