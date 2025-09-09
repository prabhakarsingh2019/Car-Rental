"use client";

import { useState } from "react";
import BookingItem from "./BookingItem";

export default function BookingList({ bookings }) {
  return (
    <div className="space-y-4">
      {bookings.length === 0 ? (
        <p className="text-brand-300">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))
      )}
    </div>
  );
}
