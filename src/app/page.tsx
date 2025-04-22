"use client";
import { useState } from "react";
import mockData from "../mockData.json";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./globals.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { VenezuelaFuture } from "@/types";
ChartJS.register(ArcElement, Tooltip, Legend);

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
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredData = mockData.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      return item[key]
        .toString()
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    });
  });

  const keys = Object.keys(VenezuelaFuture);
  const imvCounts = filteredData.reduce((acc, item) => {
    acc[keys[item.imv + 3]] = (acc[item.imv] || 0) + 1;
    return acc;
  }, {});

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

  const handleGenderChange = (e) => {
    setFilters({ ...filters, gen: e.target.value });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard-filters">
        <h2>Filter by Gender</h2>
        <select onChange={handleGenderChange} value={filters.gen}>
          <option value="">Todos</option>
          {uniqueGenders.map((gender) => (
            <option key={gender} value={gender}>
              {gender === 'M' ? 'Masculino' : 'Femenino'}
            </option>
          ))}
        </select>
      </div>
      <main className="dashboard-content">
        <div style={{ width: "50%", margin: "0 auto" }}>
          <h2>Venezuela Future Distribution</h2>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </main>
    </div>
  );
}
