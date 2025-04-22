"use client";
import { useMemo, useState } from "react";
import mockData from "../mockData.json";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./globals.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { VenezuelaFuture } from "@/types";
ChartJS.register(ArcElement, Tooltip, Legend);

const ageRanges = [
  { label: "Infantil (0-12)", min: 0, max: 12 },
  { label: "Adolescente (13-17)", min: 13, max: 17 },
  { label: "Joven (18-35)", min: 18, max: 35 },
  { label: "Adulto (36-59)", min: 36, max: 59 },
  { label: "Mayor (60+)", min: 60, max: Infinity },
];

export default function Dashboard() {
  const [filters, setFilters] = useState({
    fn: "",
    ln: "",
    st: "",
    ct: "",
    co: "",
    gen: "",
    sn: "",
    imv: "",
    hps: "",
    ageRange: null,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAgeRangeChange = (e) => {
    const selectedRange = ageRanges.find(
      (range) => range.label === e.target.value
    );
    setFilters({ ...filters, ageRange: selectedRange });
  };

  const filteredData = mockData.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      if (key === "ageRange") {
        const { min, max } = filters[key];
        return item.age >= min && item.age <= max;
      }
      return item[key]
        .toString()
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    });
  });

  const keys = Object.keys(VenezuelaFuture);
  const imvCounts = useMemo(() => {
    return filteredData.reduce((acc, item) => {
      acc[keys[item.imv + 3]] = (acc[keys[item.imv + 3]] || 0) + 1;
      return acc;
    }, {});
  }, [filteredData]);

  console.log({ imvCounts, keys });

  const pieData = {
    labels: Object.keys(imvCounts),
    datasets: [
      {
        data: Object.values(imvCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (sum, value) => sum + value,
              0
            );
            const percentage = ((context.raw / total) * 100).toFixed(2);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
  };

  const uniqueGenders = Array.from(new Set(mockData.map((item) => item.gen)));
  const uniqueCities = Array.from(new Set(mockData.map((item) => item.ct)));
  const uniqueCountries = Array.from(new Set(mockData.map((item) => item.co)));

  const handleGenderChange = (e) => {
    setFilters({ ...filters, gen: e.target.value });
  };

  const handleCityChange = (e) => {
    setFilters({ ...filters, ct: e.target.value });
  };

  const handleCountryChange = (e) => {
    setFilters({ ...filters, co: e.target.value });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Dashboard</h1>
      </header>
      <div className="dashboard-filters">
        <h2 className="text-xl font-bold mb-4">Panel de Filtros</h2>
        <div className="flex flex-row gap-4 flex-wrap">
          <div>
            <h3>Edad</h3>
            <select onChange={handleAgeRangeChange}>
              <option value="">Todos</option>
              {ageRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Género</h3>
            <select onChange={handleGenderChange} value={filters.gen}>
              <option value="">Todos</option>
              {uniqueGenders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender === "M" ? "Masculino" : "Femenino"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Ciudad</h3>
            <select onChange={handleCityChange} value={filters.ct}>
              <option value="">Todos</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>País</h3>
            <select onChange={handleCountryChange} value={filters.co}>
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
      <main className="dashboard-content">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>Venezuela Future Distribution</h2>
          <div className="w-full md:w-1/2">
            {Object.values(imvCounts).length === 0 ? (
              <p className="text-center text-gray-500">
                No hay registros para mostrar en el gráfico.
              </p>
            ) : (
              <Pie data={pieData} options={pieOptions} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
