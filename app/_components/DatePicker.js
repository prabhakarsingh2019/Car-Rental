"use client";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { isPast, parseISO } from "date-fns";
import { useCarReservation } from "./CarReservationContext";

export default function DatePicker({ bookedRanges }) {
  const { range, setRange } = useCarReservation();

  const disabledDays = bookedRanges.map((booking) => ({
    from: parseISO(booking.startDate),
    to: parseISO(booking.endDate),
  }));

  return (
    <div className="p-4 border rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-2">Select your rental dates</h2>

      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={[(date) => isPast(date), ...disabledDays]}
        fromDate={new Date()}
      />

      {range?.from && range?.to && (
        <p className="mt-2 text-sm text-gray-500">
          {range.from.toDateString()} → {range.to.toDateString()}
        </p>
      )}
    </div>
  );
}
