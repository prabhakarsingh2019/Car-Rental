import { getAllCars } from "../_lib/data-storage";
import CarsList from "../_components/cars/CarsList";
import CarFilters from "../_components/CarFilters";
export const metadata = {
  title: "Available Cars",
};
export const revalidate = 0;
export default async function Page() {
  const cars = await getAllCars();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <CarFilters />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-center text-brand-100">
        Available Cars
      </h1>

      <div className="overflow-x-hidden">
        <CarsList cars={cars} />
      </div>
    </div>
  );
}
