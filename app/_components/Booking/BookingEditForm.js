"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateRental } from "@/app/_lib/action";

export default function BookingEditForm({ booking, onClose, onUpdate }) {
  const [form, setForm] = useState({
    description: booking.description || "",
    pickupLocation: booking.pickupLocation || "",
    dropoffLocation: booking.dropoffLocation || "",
    driversLicense: booking.driversLicense || "",
    phone: booking.phone || "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateRental(booking.id, form);
    if (res.success) {
      router.refresh();
      onClose();
    } else {
      console.error(res.error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-brand-900 p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate">
          Edit Booking #{booking.id}
        </h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-brand-300">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-brand-300">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            value={form.pickupLocation}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-brand-300">Dropoff Location</label>
          <input
            type="text"
            name="dropoffLocation"
            value={form.dropoffLocation}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-brand-300">Driver’s License</label>
          <input
            type="text"
            name="driversLicense"
            value={form.driversLicense}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-brand-300">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white focus:outline-none focus:ring-2 focus:ring-accent-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-brand-600 rounded-lg text-white hover:bg-brand-500 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
