import Image from "next/image";

function CarDetails({ car }) {
  return (
    <div className="max-w-6xl mx-auto bg-brand-800 shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <div className="relative w-full h-96 md:h-auto">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-accent-400 mb-2">
            {car.brand} {car.model}
          </h1>
          <p className="text-brand-200 text-lg mb-6">{car.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-lg font-bold text-brand-500">Year</p>
              <p className="font-semibold">{car.year}</p>
            </div>
            <div>
              <p className="text-lg text-brand-500">Type</p>
              <p className="font-semibold">{car.type}</p>
            </div>
            <div>
              <p className="text-lg text-brand-500 font-bold">Seats</p>
              <p className="font-semibold">{car.seats}</p>
            </div>
            <div>
              <p className="text-lg text-brand-500 font-bold">Fuel</p>
              <p className="font-semibold">{car.fuel_type}</p>
            </div>
            {/* <div>
              <p className="text-lg font-bold text-brand-500">Availability</p>
              <span
                className={`px-3 py-1 rounded-full text-md font-medium ${
                  car.availability === "Available"
                    ? "bg-success-200 text-success-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {car.availability}
              </span>
            </div> */}
            <div>
              <p className="text-lg font-bold text-brand-500">Price / Day</p>
              <p className="font-semibold text-secondary-600">
                ₹{car.price_per_day.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* <div>
          <button
            disabled={car.availability !== "Available"}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              car.availability === "Available"
                ? "bg-secondary-600 hover:bg-secondary-700"
                : "bg-brand-400 cursor-not-allowed"
            }`}
          >
            {car.availability === "Available" ? "Book Now" : "Currently Booked"}
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default CarDetails;
