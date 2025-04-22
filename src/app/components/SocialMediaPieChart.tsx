import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface SocialMediaPieChartProps {
  socialMediaData: ChartData;
  socialMediaOptions: ChartOptions;
  snCounts: Record<string, number>;
}

export default function SocialMediaPieChart({
  socialMediaData,
  socialMediaOptions,
  snCounts,
}: SocialMediaPieChartProps) {
  return (
    <div className="w-full md:w-1/2">
      {Object.values(snCounts).length === 0 ? (
        <p className="text-center text-gray-500">
          No hay registros para mostrar en el gráfico.
        </p>
      ) : (
        <>
          <h2 className="text-center text-xl font-bold mb-4">Redes Sociales Preferidas</h2>
          <Pie data={socialMediaData} options={socialMediaOptions} />
        </>
      )}
    </div>
  );
}