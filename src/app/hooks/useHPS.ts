import { useMemo } from "react";

type FilteredData = {
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
}[];

interface TooltipContext {
  dataset: { data: number[] };
  raw: number;
  label: string;
}

interface HPSOptionsType {
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: TooltipContext) => string;
      };
    };
  };
}

export const useHPS = (filteredData: FilteredData) => {
  const hpsCounts = useMemo(() => {
    return filteredData.reduce((acc: Record<number, number>, item) => {
      acc[item.hps] = (acc[item.hps] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }, [filteredData]);

  const hpsData = {
    labels: Object.keys(hpsCounts),
    datasets: [
      {
        data: Object.values(hpsCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const hpsOptions: HPSOptionsType = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipContext) {
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

  return {
    hpsCounts,
    hpsData,
    hpsOptions,
  };
};
