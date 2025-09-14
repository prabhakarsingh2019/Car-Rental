import BookingList from "@/app/_components/Booking/BookingList";
import { auth } from "@/app/_lib/auth";
import { getBookingByUser } from "@/app/_lib/data-storage";
export const metadata = {
  title: "My Bookings",
};
async function page() {
  const session = await auth();
  const customerBookings = await getBookingByUser(session.user.customerId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Bookings</h2>
      <BookingList bookings={customerBookings} />
    </div>
  );
}

export default page;
