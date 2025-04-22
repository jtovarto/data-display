import React from "react";

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
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleAgeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRange: { label: string; min: number; max: number } | undefined = ageRanges.find(
            (range) => range.label === e.target.value
        );
        setFilters({ ...filters, ageRange: selectedRange });
    };

    return (
        <div className="dashboard-filters bg-white border border-gray-300 rounded-lg p-6 mx-auto max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Panel de Filtros</h2>
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
        </div>
    );
}
