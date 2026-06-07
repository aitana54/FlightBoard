"use client";

import { createContext, useContext, useState, useCallback } from "react";

const FlightsContext = createContext();

export function FlightsProvider({ children, initialFlights = [] }) {
  const [flights, setFlights] = useState(initialFlights);

  const updateFlight = useCallback((updatedFlight) => {
    setFlights((prevFlights) =>
      prevFlights.map((f) =>
        f.id === updatedFlight.id ? { ...f, ...updatedFlight } : f
      )
    );
  }, []);

  const removeFlight = useCallback((flightId) => {
    setFlights((prevFlights) =>
      prevFlights.filter((f) => f.id !== flightId)
    );
  }, []);

  return (
    <FlightsContext.Provider value={{ flights, updateFlight, removeFlight }}>
      {children}
    </FlightsContext.Provider>
  );
}

export function useFlights() {
  return useContext(FlightsContext);
}
