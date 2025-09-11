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

  if (!car) {
    return (
      <div className="text-center py-20 text-brand-100">Car not found</div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-12 space-y-12">
      <CarDetails car={car} />

      <CarReservationProvider>
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 space-y-6 lg:space-y-0">
          <div className="lg:flex-1">
            <DatePicker bookedRanges={bookedDates} />
          </div>
          <div className="lg:flex-1">
            <CarReservationForm car={car} user={session?.user} />
          </div>
        </div>
      </CarReservationProvider>

      <div className="max-w-6xl mx-auto">
        <ReviewList reviews={reviews} />
      </div>
    </main>
  );
}

export default Page;
