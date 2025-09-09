import {
  getBookedDates,
  getCarById,
  getReviewsByCarId,
} from "@/app/_lib/data-storage";
import CarDetails from "@/app/_components/cars/CarDetails";
import ReviewList from "@/app/_components/Reviews/RewiesList";
import DatePicker from "@/app/_components/DatePicker";
import { CarReservationProvider } from "@/app/_components/CarReservationContext";
import CarReservationForm from "@/app/_components/CarReservationForm";
import { auth } from "@/app/_lib/auth";

async function Page({ params }) {
  const { carId } = await params;
  const session = await auth();
  const [car, reviews, bookedDates] = await Promise.all([
    getCarById(carId),
    getReviewsByCarId(carId),
    getBookedDates(carId),
  ]);
  console.log(bookedDates);
  if (!car) {
    return <div className="text-center py-20">Car not found</div>;
  }

  return (
    <main className="min-h-screen bg-brand-900 py-12 px-6">
      <CarDetails car={car} />
      <CarReservationProvider>
        <DatePicker bookedRanges={bookedDates} />
        <CarReservationForm car={car} user={session?.user} />
      </CarReservationProvider>
      <ReviewList reviews={reviews} />
    </main>
  );
}

export default Page;
