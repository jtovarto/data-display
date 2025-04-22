"use client";
import { useState } from "react";
import mockData from "../mockData.json";
import "chart.js/auto";
import "./globals.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import FilterPanel from "./components/FilterPanel";
import PieChart from "./components/PieChart";
import SocialMediaPieChart from "./components/SocialMediaPieChart";
import HpsPieChart from "./components/HpsPieChart";
import { useIMV } from "./hooks/useIMV";
import { useSocialMedia } from "./hooks/useSocialMedia";
import { useHPS } from "./hooks/useHPS";
ChartJS.register(ArcElement, Tooltip, Legend);

const ageRanges = [
  { label: "Infantil (0-12)", min: 0, max: 12 },
  { label: "Adolescente (13-17)", min: 13, max: 17 },
  { label: "Joven (18-35)", min: 18, max: 35 },
  { label: "Adulto (36-59)", min: 36, max: 59 },
  { label: "Mayor (60+)", min: 60, max: Infinity },
];

export default function Dashboard() {
  const [showPieChart, setShowPieChart] = useState(true);
  const [showSocialChart, setShowSocialChart] = useState(true);
  const [showHpsChart, setShowHpsChart] = useState(true);
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
    ageRange: undefined,
  });

  const filteredData = mockData.filter((item) => {
    return Object.keys(filters).every((key) => {
      const typedKey = key as keyof typeof filters;
      if (!filters[typedKey]) return true;
      if (key === "ageRange") {
        if (filters[key]) {
          const { min, max } = filters[key] as { min: number; max: number };
          return item.age >= min && item.age <= max;
        }
        return true;
      }
      return (
        item as {
          fn: string;
          ln: string;
          st: string;
          ct: string;
          co: string;
          age: number;
          gen: string;
          sn: string;
          imv: number;
          hps: number;
        }
      )[key as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(
          filters[key as keyof typeof filters]?.toString().toLowerCase() || ""
        );
    });
  });

  const { imvCounts, ivmData, ivmOptions } = useIMV(filteredData);
  const { socialMediaData, socialMediaOptions, socialMediaCounts } =
    useSocialMedia(filteredData);

  const { hpsCounts, hpsData, hpsOptions } = useHPS(filteredData);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Dashboard
        </h1>
      </header>
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        ageRanges={ageRanges}
      />
      <main className="dashboard-content mt-16 md:mt-48">
        <div className="bg-white p-2 border border-gray-300 rounded-lg mb-8 w-full md:w-[85%] flex flex-col  gap-8 mx-auto">
          <div className="flex flex-row justify-between border-b-1 border-gray-300 p-4 text-3xl">
            <p className="text-gray-700 text-sm md:text-3xl ">
              1. ¿Cómo imagina usted a Venezuela en los próximos 6 meses?
            </p>
            <button
              onClick={() => setShowPieChart((prev) => !prev)}
              className="bg-blue-500 text-white py-0 px-2 rounded-lg text-sm"
            >
              {showPieChart ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex flex-row justify-between border-b-1 border-gray-300 p-4 text-3xl">
            <p className="text-gray-700 text-sm md:text-3xl">
              2. ¿Cuál es la red social que usted utiliza con mayor frecuencia?
            </p>
            <button
              onClick={() => setShowSocialChart((prev) => !prev)}
              className="bg-blue-500 text-white py-0 px-2 rounded-lg text-sm"
            >
              {showSocialChart ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex flex-row justify-between  p-4 text-3xl">
            <p className="text-gray-700 text-sm md:text-3xl ">
              3. ¿Si usted fuese Presidente de la República, cuál sería el
              problema que atendería con la mayor urgencia?
            </p>

            <button
              onClick={() => setShowHpsChart((prev) => !prev)}
              className="bg-blue-500 text-white py-0 px-2 rounded-lg text-sm"
            >
              {showHpsChart ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-center">
          {showPieChart && (
            <PieChart
              pieData={ivmData}
              pieOptions={ivmOptions}
              imvCounts={imvCounts}
            />
          )}
          {showSocialChart && (
            <SocialMediaPieChart
              socialMediaData={socialMediaData}
              socialMediaOptions={socialMediaOptions}
              snCounts={socialMediaCounts}
            />
          )}
          {showHpsChart && (
            <HpsPieChart
              hpsData={hpsData}
              hpsOptions={hpsOptions}
              hpsCounts={hpsCounts}
            />
          )}
        </div>
      </main>
    </div>
  );
}
