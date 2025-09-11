"use client";

import BookingItem from "./BookingItem";

export default function BookingList({ bookings }) {
  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
      {bookings.length === 0 ? (
        <p className="text-brand-300 text-center py-6">No bookings found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
