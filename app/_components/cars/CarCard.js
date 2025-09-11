import Image from "next/image";
import Link from "next/link";
import SkeletonShimmer from "../SkeletonShimmer";

function CarCard({ car }) {
  return (
    <div className="bg-brand-800 text-brand-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Car Image */}
      <div className="relative w-full h-42 sm:h-42 md:h-56 lg:h-46">
        {!car.image && <SkeletonShimmer className="w-full h-full rounded-xl" />}
        {car.image && (
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-contain object-center rounded-xl"
            loading="lazy"
          />
        )}
      </div>

      {/* Car Info */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-accent-400">
          {car.brand} {car.model} ({car.year})
        </h2>
        <p className="text-sm sm:text-base text-brand-300">
          {car.type} • {car.seats} seats • {car.fuel_type}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mt-2">
          <p className="text-lg sm:text-xl font-bold text-accent-500">
            ₹{car.price_per_day.toLocaleString()} / day
          </p>

          <Link
            href={`/cars/${car.id}`}
            className="bg-accent-500 hover:bg-accent-600 text-brand-100 px-4 sm:px-5 py-2 rounded-lg shadow-md uppercase font-medium w-full sm:w-auto text-center transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
