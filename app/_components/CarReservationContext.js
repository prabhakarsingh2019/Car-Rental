"use client";
import { createContext, useContext, useState } from "react";

const initialState = {
  from: undefined,
  to: undefined,
};

const CarReservationContext = createContext();

function CarReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <CarReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </CarReservationContext.Provider>
  );
}

function useCarReservation() {
  const context = useContext(CarReservationContext);
  if (!context) {
    throw new Error(
      "useCarReservation must be used within a CarReservationProvider"
    );
  }
  return context;
}

export { CarReservationProvider, useCarReservation };
