"use client";

import { useState, useMemo } from "react";

export default function FlightsListClient({ initialFlights }) {
  const [flights, setFlights] = useState(initialFlights);
  const [search, setSearch] = useState("");

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
