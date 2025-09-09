"use client";
import { useState } from "react";
import { differenceInDays } from "date-fns";
import { useCarReservation } from "./CarReservationContext";
import { toast } from "react-toastify";
import { createBooking } from "../_lib/action";
import { useRouter } from "next/navigation";

export default function CarReservationForm({ car, user }) {
  const router = useRouter();
  const { range, resetRange } = useCarReservation();
  const { id: carId, price_per_day } = car;
  const startDate = range?.from;
  const endDate = range?.to;

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email || "",
    phone: "",
    paymentMethod: "cash",
    description: "",
    pickupLocation: "",
    dropoffLocation: "",
    driversLicense: "",
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const numDays =
    startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const totalPrice = numDays * price_per_day;

  const data = {
    carId,
    customerId: user.customerId,
    startDate,
    endDate,
    totalPrice,
    ...formData,
    isPayed: formData.paymentMethod === "cash" ? false : true,
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleBooking() {
    try {
      const bookingData = await createBooking(data);
      console.log(bookingData);
      resetRange();
      router.push(`/thank-you?bookingId=${bookingData}`);
      toast.success("Booking successful!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking failed.");
    }
  }

  async function handleSubmit() {
    if (formData.paymentMethod === "cash") {
      await handleBooking();
    } else {
      setShowPaymentModal(true);
    }
  }

  async function handleDummyPayment() {
    setLoadingPayment(true);
    toast.info("Processing payment...");

    setTimeout(async () => {
      setLoadingPayment(false);
      setShowPaymentModal(false);

      const success = Math.random() > 0.2;
      if (success) {
        toast.success("Payment successful!");
        await handleBooking();
      } else {
        toast.error("Payment failed. Try again.");
      }
    }, 2000);
  }

  return (
    <div className="bg-brand-800 p-6 rounded-lg mt-8 space-y-4">
      <h2 className="text-xl font-bold text-accent-400">Book this Car</h2>

      {startDate && endDate ? (
        <p className="text-sm text-brand-300">
          {numDays} days * ${price_per_day} ={" "}
          <span className="font-semibold text-accent-500">${totalPrice}</span>
        </p>
      ) : (
        <p className="text-sm text-brand-400">
          Select dates above to see price
        </p>
      )}

      <form
        action={async (e) => {
          await handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm text-brand-300 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            disabled
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-brand-700 text-white disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            disabled
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-brand-700 text-white disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-brand-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-brand-700 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Dropoff Location
          </label>
          <input
            type="text"
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-brand-700 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-brand-700 text-white"
          >
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Driver’s License Number
          </label>
          <input
            type="text"
            name="driversLicense"
            value={formData.driversLicense}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-brand-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-brand-300 mb-1">
            Purpose of Booking (optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Business trip, vacation, personal use, etc."
            className="w-full px-3 py-2 rounded-md bg-brand-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg w-full"
        >
          Confirm Booking
        </button>
      </form>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Dummy Payment</h3>
            <p className="mb-4">
              Pay ${totalPrice} using {formData.paymentMethod}
            </p>
            <button
              onClick={handleDummyPayment}
              disabled={loadingPayment}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              {loadingPayment ? "Processing..." : "Pay Now"}
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              disabled={loadingPayment}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
