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

interface SocialMediaTooltipContext {
  dataset: { data: number[] };
  raw: number;
  label: string;
}

interface SocialMediaOptions {
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: SocialMediaTooltipContext) => string;
      };
    };
  };
}

export const useSocialMedia = (filteredData: FilteredData) => {
  const socialMediaCounts = useMemo(() => {
    return filteredData.reduce((acc: Record<string, number>, item) => {
      acc[item.sn] = (acc[item.sn] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredData]);

  const socialMediaData = {
    labels: Object.keys(socialMediaCounts),
    datasets: [
      {
        data: Object.values(socialMediaCounts),
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

  const socialMediaOptions: SocialMediaOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: SocialMediaTooltipContext) {
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
    socialMediaCounts,
    socialMediaData,
    socialMediaOptions,
  };
};
