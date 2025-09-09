"use client";
import { Trash } from "lucide-react";

import { useState } from "react";
import BookingEditForm from "./BookingEditForm";
import { isPast } from "date-fns";
import { deleteBooking } from "@/app/_lib/action";
import { useRouter } from "next/navigation";

export default function BookingItem({ booking, onDelete, onUpdate }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-start justify-between bg-brand-800 p-4 rounded-xl shadow-md">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">
          Booking #{booking.id}
        </h3>
        <p className="text-brand-300">
          {booking.startDate} → {booking.endDate}
        </p>
        <p className="text-brand-300">Car ID: {booking.carId}</p>
        <p className="text-brand-300">Status: {booking.status}</p>
        <p className="text-brand-300">Total: ₹{booking.totalPrice}</p>
      </div>

      <div className="h-full flex flex-col justify-center gap-2 mx-auto">
        {!isPast(new Date(booking.startDate)) && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-brand-600 text-white rounded-lg hover:bg-brand-500"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => {
            deleteBooking(booking.id);
            router.refresh();
          }}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
        >
          <Trash /> Delete
        </button>
      </div>

      {isEditing && (
        <BookingEditForm
          booking={booking}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
