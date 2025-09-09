import { getAllCars } from "../_lib/data-storage";
import CarsList from "../_components/cars/CarsList";
import CarFilters from "../_components/CarFilters";
import { auth } from "../_lib/auth";

export default async function Page() {
  const cars = await getAllCars();

  return (
    <div className="max-w-9xl mx-auto px-6 py-12">
      <CarFilters />
      <h1 className="text-4xl font-bold mb-10 text-center text-brand-100">
        Available Cars
      </h1>
      <CarsList cars={cars} />
    </div>
  );
}
