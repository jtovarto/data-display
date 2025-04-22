import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

interface FilterPanelProps {
  filters: {
    gen: string;
    ct: string;
    co: string;
    ageRange?: { label: string; min: number; max: number };
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      gen: string;
      ct: string;
      co: string;
      ageRange?: { label: string; min: number; max: number };
    }>
  >;
  ageRanges: { label: string; min: number; max: number }[];
  uniqueGenders: string[];
  uniqueCities: string[];
  uniqueCountries: string[];
}

export default function FilterPanel({
  filters,
  setFilters,
  ageRanges,
  uniqueGenders,
  uniqueCities,
  uniqueCountries,
}: FilterPanelProps) {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsPanelVisible(mediaQuery.matches);

    const handleResize = () => {
      setIsPanelVisible(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAgeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange:
      | { label: string; min: number; max: number }
      | undefined = ageRanges.find((range) => range.label === e.target.value);
    setFilters({ ...filters, ageRange: selectedRange });
  };

  const togglePanelVisibility = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  return (
    <div className="dashboard-filters bg-white border border-gray-300 rounded-lg p-6 mx-auto max-w-4xl transition-all duration-300 ease-in-out transform fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Panel de Filtros</h2>
        <button
          onClick={togglePanelVisibility}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isPanelVisible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
      <Transition
        show={isPanelVisible}
        enter="transition-all duration-300 ease-in-out"
        enterFrom="transform scale-y-0 opacity-0"
        enterTo="transform scale-y-100 opacity-100"
        leave="transition-all duration-300 ease-in-out"
        leaveFrom="transform scale-y-100 opacity-100"
        leaveTo="transform scale-y-0 opacity-0"
        className="origin-top"
      >
        <div>
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex-1">
              <h3>Edad</h3>
              <select className="w-full" onChange={handleAgeRangeChange}>
                <option value="">Todos</option>
                {ageRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <h3>Género</h3>
              <select
                className="w-full"
                onChange={handleFilterChange}
                name="gen"
                value={filters.gen}
              >
                <option value="">Todos</option>
                {uniqueGenders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender === "M" ? "Masculino" : "Femenino"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <h3>Ciudad</h3>
              <select
                className="w-full"
                onChange={handleFilterChange}
                name="ct"
                value={filters.ct}
              >
                <option value="">Todos</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <h3>País</h3>
              <select
                className="w-full"
                onChange={handleFilterChange}
                name="co"
                value={filters.co}
              >
                <option value="">Todos</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() =>
                setFilters({
                  gen: "",
                  ct: "",
                  co: "",
                  ageRange: undefined,
                })
              }
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
