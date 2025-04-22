import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface HpsPieChartProps {
  hpsData: ChartData;
  hpsOptions: ChartOptions;
  hpsCounts: Record<string, number>;
}

export default function HpsPieChart({ hpsData, hpsOptions, hpsCounts }: HpsPieChartProps) {
  return (
    <div className="w-full md:w-1/2">
      {Object.values(hpsCounts).length === 0 ? (
        <p className="text-center text-gray-500">
          No hay registros para mostrar en el gráfico.
        </p>
      ) : (
        <>
          <h2 className="text-center text-xl font-bold mb-4">Distribución de HPS</h2>
          <Pie data={hpsData} options={hpsOptions} />
        </>
      )}
    </div>
  );
}