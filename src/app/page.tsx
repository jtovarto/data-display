"use client";
import { useMemo, useState } from "react";
import mockData from "../mockData.json";
import "chart.js/auto";
import "./globals.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { VenezuelaFuture } from "@/types";
import FilterPanel from "./components/FilterPanel";
import PieChart from "./components/PieChart";
import SocialMediaPieChart from "./components/SocialMediaPieChart";
import HpsPieChart from "./components/HpsPieChart";
ChartJS.register(ArcElement, Tooltip, Legend);

const ageRanges = [
  { label: "Infantil (0-12)", min: 0, max: 12 },
  { label: "Adolescente (13-17)", min: 13, max: 17 },
  { label: "Joven (18-35)", min: 18, max: 35 },
  { label: "Adulto (36-59)", min: 36, max: 59 },
  { label: "Mayor (60+)", min: 60, max: Infinity },
];

type PieOptionType = {
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: {
          dataset: { data: number[] };
          raw: number;
          label: string;
        }) => string;
      };
    };
  };
};

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

  const keys = Object.keys(VenezuelaFuture);
  const imvCounts = useMemo(() => {
    return filteredData.reduce((acc: Record<string, number>, item) => {
      acc[keys[item.imv + 3]] = (acc[keys[item.imv + 3]] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredData, keys]);

  const pieData = {
    labels: Object.keys(imvCounts),
    datasets: [
      {
        data: Object.values(imvCounts) as number[],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions: PieOptionType = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce(
              (sum, value) => sum + (typeof value === "number" ? value : 0),
              0
            );
            const rawValue =
              typeof tooltipItem.raw === "number" ? tooltipItem.raw : 0;
            const percentage = ((rawValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${rawValue} (${percentage}%)`;
          },
        },
      },
    },
  };

  const snCounts = useMemo(() => {
    return mockData.reduce((acc, item) => {
      acc[item.sn] = (acc[item.sn] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const socialMediaData = {
    labels: Object.keys(snCounts),
    datasets: [
      {
        data: Object.values(snCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverOffset: 4,
      },
    ],
  };

  const socialMediaOptions = {
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

  const hpsCounts = useMemo(() => {
    return mockData.reduce((acc, item) => {
      acc[item.hps] = (acc[item.hps] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const hpsData = {
    labels: Object.keys(hpsCounts),
    datasets: [
      {
        data: Object.values(hpsCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverOffset: 4,
      },
    ],
  };

  const hpsOptions = {
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
        uniqueGenders={uniqueGenders}
        uniqueCities={uniqueCities}
        uniqueCountries={uniqueCountries}
      />
      <main className="dashboard-content">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>Venezuela Future Distribution</h2>
          <PieChart
            pieData={pieData}
            pieOptions={pieOptions}
            imvCounts={imvCounts}
          />
          <SocialMediaPieChart
            socialMediaData={socialMediaData}
            socialMediaOptions={socialMediaOptions}
            snCounts={snCounts}
          />
          <HpsPieChart
            hpsData={hpsData}
            hpsOptions={hpsOptions}
            hpsCounts={hpsCounts}
          />
        </div>
      </main>
    </div>
  );
}
