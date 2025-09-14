import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import { getRentalById } from "../_lib/data-storage";

export const metadata = {
  title: "Thank You",
};

export default async function ThankYouPage({ searchParams }) {
  const session = await auth();
  const { bookingId } = await searchParams;

  if (!bookingId) {
    redirect("/");
  }

  const booking = await getRentalById(bookingId);

  if (!booking) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-brand-800 flex items-center justify-center px-4 py-8">
      <div className="bg-brand-900 shadow-lg rounded-2xl p-6 sm:p-8 max-w-xl w-full border border-brand-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-success-100 text-success-600 text-lg sm:text-xl">
            ✓
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-brand-100">
            Booking Confirmed!
          </h1>
        </div>
        <p className="text-brand-100 mb-4 text-sm sm:text-base">
          Thank you,{" "}
          <span className="font-semibold text-accent-800">
            {session?.user?.name || "Guest"}
          </span>
          . Your booking has been successfully created.
        </p>
        <div className="bg-brand-600 rounded-xl p-4 sm:p-6 space-y-2 sm:space-y-3 text-sm sm:text-base">
          <h2 className="text-base sm:text-lg font-semibold text-brand-950 mb-2">
            Booking Details
          </h2>
          <p>
            <span className="font-medium text-brand-950">Booking ID:</span>{" "}
            {booking.id}
          </p>
          <p>
            <span className="font-medium text-brand-950">Car ID:</span>{" "}
            {booking.carId}
          </p>
          <p>
            <span className="font-medium text-brand-950">Start Date:</span>{" "}
            {booking.startDate}
          </p>
          <p>
            <span className="font-medium text-brand-950">End Date:</span>{" "}
            {booking.endDate}
          </p>
          <p>
            <span className="font-medium text-brand-950">Pickup Location:</span>{" "}
            {booking.pickupLocation}
          </p>
          <p>
            <span className="font-medium text-brand-950">
              Dropoff Location:
            </span>{" "}
            {booking.dropoffLocation}
          </p>
          <p>
            <span className="font-medium text-brand-950">Payment Method:</span>{" "}
            {booking.paymentMethod}
          </p>
          <p>
            <span className="font-medium text-brand-950">Total Price:</span>{" "}
            <span className="text-accent-600 font-bold">
              ₹{booking.totalPrice}
            </span>
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-accent-500 text-xs sm:text-sm">
            A confirmation has been sent to your registered email.
          </p>
        </div>
      </div>
    </div>
  );
}
