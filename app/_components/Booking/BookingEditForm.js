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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="bg-brand-900 p-6 rounded-xl shadow-lg space-y-4 w-96"
      >
        <h3 className="text-xl font-semibold text-white mb-2">
          Edit Booking #{booking.id}
        </h3>

        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            name="pickupLocation"
            value={form.pickupLocation}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Dropoff Location
          </label>
          <input
            type="text"
            name="dropoffLocation"
            value={form.dropoffLocation}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Driver’s License
          </label>
          <input
            type="text"
            name="driversLicense"
            value={form.driversLicense}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-brand-800 text-white"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-brand-600 rounded-lg text-white hover:bg-brand-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
