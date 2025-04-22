import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface PieChartProps {
  pieData: ChartData<"pie">;
  pieOptions: ChartOptions<"pie">;
  imvCounts: Record<string, number>;
}

export default function PieChart({ pieData, pieOptions, imvCounts }: PieChartProps) {
  return (
    <div className="w-full md:w-1/2">
      {Object.values(imvCounts).length === 0 ? (
        <p className="text-center text-gray-500">
          No hay registros para mostrar en el gráfico.
        </p>
      ) : (
        <Pie data={pieData} options={{ ...pieOptions, scales: undefined }} />
      )}
    </div>
  );
}