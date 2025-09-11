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
    <div className="bg-brand-800 p-4 sm:p-6 rounded-lg mt-6 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-accent-400 text-center sm:text-left">
        Book this Car
      </h2>

      {startDate && endDate ? (
        <p className="text-sm text-brand-300 text-center sm:text-left">
          {numDays} days * ${price_per_day} ={" "}
          <span className="font-semibold text-accent-500">${totalPrice}</span>
        </p>
      ) : (
        <p className="text-sm text-brand-400 text-center sm:text-left">
          Select dates above to see price
        </p>
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-brand-300 mb-1">
              Full Name
            </label>
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
              Driver&apos;s License Number
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-brand-800 p-6 rounded-lg w-full max-w-md shadow-lg space-y-4">
            <h3 className="text-lg font-bold">
              Payment - {formData.paymentMethod}
            </h3>
            <p className="text-sm text-gray-600">
              Pay <span className="font-semibold">${totalPrice}</span> using{" "}
              {formData.paymentMethod.toUpperCase()}
            </p>

            {(formData.paymentMethod === "credit-card" ||
              formData.paymentMethod === "debit-card") && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                {formData.paymentMethod === "credit-card" && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      className="w-1/2 px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      required
                      className="w-1/2 px-3 py-2 border rounded"
                    />
                  </div>
                )}
                {formData.paymentMethod === "credit-card" && (
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                )}
                {formData.paymentMethod === "debit-card" && (
                  <input
                    type="text"
                    placeholder="ATM PIN"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                )}
              </div>
            )}

            {formData.paymentMethod === "upi" && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. user@upi)"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <p className="text-xs text-gray-500">
                  You will receive a request in your UPI app.
                </p>
              </div>
            )}

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
