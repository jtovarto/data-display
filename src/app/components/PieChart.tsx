import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface PieChartProps {
  pieData: ChartData<"pie">;
  pieOptions: Record<string, unknown>;
  imvCounts: Record<string, number>;
}

export default function PieChart({
  pieData,
  pieOptions,
  imvCounts,
}: PieChartProps) {
  return (
    <div className="w-full md:w-1/2 bg-white border border-gray-300 rounded-lg px-4 py-8">
      {Object.values(imvCounts).length === 0 ? (
        <p className="text-center text-gray-500">
          No hay registros para mostrar en el gráfico.
        </p>
      ) : (
        <>
          <h2 className="text-center text-xl font-bold mb-4">
            Venezuela Future Distribution
          </h2>
          <Pie data={pieData} options={{ ...pieOptions, scales: undefined }} />
        </>
      )}
    </div>
  );
}
