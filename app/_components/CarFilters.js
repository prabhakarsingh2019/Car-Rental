"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const filtersObj = {
  type: {
    All: "",
    SUV: "SUV",
    Sedan: "Sedan",
    Truck: "Truck",
  },
  fuel_type: {
    All: "",
    Gasoline: "Gasoline",
    Diesel: "Diesel",
    Electric: "Electric",
  },
  seats: {
    All: "",
    2: "2",
    4: "4",
    6: "6",
    8: "8",
  },
  price_sort: {
    Default: "",
    Asc: "asc",
    Desc: "desc",
  },
};

export default function CarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-brand-700 text-white rounded-lg shadow hover:bg-brand-800 transition"
      >
        Filters
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-neutral-50 rounded-2xl shadow-2xl w-[90%] max-w-md p-6 space-y-6 border border-neutral-200">
            <h2 className="text-xl font-semibold text-brand-800">
              Filter Cars
            </h2>
            {Object.entries(filtersObj).map(([filterKey, options]) => (
              <div key={filterKey}>
                <h3 className="font-medium mb-2 capitalize text-brand-700">
                  {filterKey.replace("_", " ")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(options).map(([label, value]) => {
                    const active = searchParams.get(filterKey) === value;
                    return (
                      <button
                        key={label}
                        onClick={() => updateQuery(filterKey, value)}
                        className={`px-3 py-1 rounded-full border transition ${
                          active
                            ? "bg-accent-500 text-white border-accent-600 shadow-md"
                            : "bg-neutral-100 text-brand-700 border-neutral-300 hover:bg-neutral-200"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-brand-700 hover:bg-neutral-100 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("?"); // reset filters
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
