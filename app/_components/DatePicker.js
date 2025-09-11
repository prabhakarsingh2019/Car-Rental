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
    <div className="p-4 border rounded-lg shadow-md mt-6 bg-white dark:bg-brand-900">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Select your rental dates
      </h2>

      <div className="flex justify-center">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          disabled={[(date) => isPast(date), ...disabledDays]}
          fromDate={new Date()}
          className="text-sm sm:text-base"
        />
      </div>

      {range?.from && range?.to && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
          {range.from.toDateString()} → {range.to.toDateString()}
        </p>
      )}
    </div>
  );
}
