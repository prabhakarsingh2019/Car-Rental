import Image from "next/image";
import Link from "next/link";
import SkeletonShimmer from "../SkeletonShimmer";

function CarCard({ car }) {
  return (
    <div
      key={car.id}
      className="bg-brand-800 text-brand-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative h-48  sm:h-64 lg:h-72 w-full">
        {!car.image && <SkeletonShimmer className="w-20 h-20" />}
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2 text-accent-400">
          {car.brand} {car.model} ({car.year})
        </h2>
        <p className="text-sm text-brand-300 mb-4">
          {car.type} • {car.seats} seats • {car.fuel_type}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-accent-500">
              ${car.price_per_day} / day
            </p>
            {/*  <span
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                car.availability === "Available"
                  ? "bg-success-500/20 text-success-400"
                  : "bg-accent-700/30 text-accent-400"
              }`}
            >
              {car.availability}
            </span> */}
          </div>
          <Link
            href={`/cars/${car.id}`}
            className="bg-accent-500 hover:bg-accent-600 text-brand-100 px-5 py-2 rounded-lg shadow-md uppercase font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
