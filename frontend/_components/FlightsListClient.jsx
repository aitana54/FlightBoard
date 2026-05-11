"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000";

export default function FlightsListClient({ initialFlights }) {
  const [flights, setFlights] = useState(initialFlights);
  const [search, setSearch] = useState("");

  const [origin, setOrigin] = useState("");const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFlights() {
      try {
        setLoading(true);

        const res = await fetch(
          `${API}/api/v1/flights`
        );

        if (!res.ok) {
          throw new Error("Error cargando vuelos");
        }

        const data = await res.json();

        setFlights(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFlights();
  }, []);

  const filtered = useMemo(() => {
    return flights.filter((f) =>
      f.origin.includes(search) || f.destination.includes(search)
    );
  }, [flights, search]);

  return (
    <div>
      <input onChange={e => setSearch(e.target.value)} />
      {filtered.map(f => (
        <div key={f.id}>{f.origin} → {f.destination}</div>
      ))}
    </div>
  );
}
