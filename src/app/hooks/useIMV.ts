import { VenezuelaFuture } from "@/types";
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

const IVM_KEYS = Object.keys(VenezuelaFuture);

export const useIMV = (filteredData: FilteredData) => {
  const imvCounts = useMemo(() => {
    return filteredData.reduce((acc: Record<string, number>, item) => {
      acc[IVM_KEYS[item.imv + 3]] = (acc[IVM_KEYS[item.imv + 3]] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredData]);

  const ivmData = {
    labels: Object.keys(imvCounts),
    datasets: [
      {
        data: Object.values(imvCounts) as number[],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  const ivmOptions: PieOptionType = {
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

  return {
    imvCounts,
    ivmData,
    ivmOptions,
  };
};
