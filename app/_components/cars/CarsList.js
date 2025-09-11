"use client";
import { useSearchParams } from "next/navigation";
import CarCard from "./CarCard";

function CarsList({ cars }) {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const fuel = searchParams.get("fuel_type");
  const seats = searchParams.get("seats");
  const sort = searchParams.get("sort");

  let filteredCars = cars ?? [];

  if (type) filteredCars = filteredCars.filter((car) => car.type === type);
  if (fuel) filteredCars = filteredCars.filter((car) => car.fuel_type === fuel);
  if (seats)
    filteredCars = filteredCars.filter((car) => car.seats === Number(seats));

  if (sort === "asc") {
    filteredCars = filteredCars.sort(
      (a, b) => a.price_per_day - b.price_per_day
    );
  } else if (sort === "desc") {
    filteredCars = filteredCars.sort(
      (a, b) => b.price_per_day - a.price_per_day
    );
  }

  if (!filteredCars.length) {
    return (
      <div className="bg-brand-800/40 p-6 rounded-2xl text-center text-brand-300 mt-6">
        No cars found. Try changing your filters.
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {filteredCars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarsList;
