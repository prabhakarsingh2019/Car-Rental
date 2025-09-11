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
    <div className="flex flex-col sm:flex-row sm:items-start justify-between bg-brand-800 p-4 rounded-xl shadow-md gap-4 sm:gap-6 w-full">
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold text-white truncate">
          Booking #{booking.id}
        </h3>
        <p className="text-brand-300 text-sm sm:text-base">
          {booking.startDate} → {booking.endDate}
        </p>
        <p className="text-brand-300 text-sm sm:text-base">
          Car ID: {booking.carId}
        </p>
        <p className="text-brand-300 text-sm sm:text-base">
          Status: {booking.status}
        </p>
        <p className="text-brand-300 text-sm sm:text-base">
          Total: ₹{booking.totalPrice.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 items-center sm:items-end">
        {!isPast(new Date(booking.startDate)) && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-brand-600 text-white rounded-lg hover:bg-brand-500 text-sm sm:text-base w-full sm:w-auto"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => {
            deleteBooking(booking.id);
            router.refresh();
          }}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1 text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <Trash size={16} /> Delete
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
