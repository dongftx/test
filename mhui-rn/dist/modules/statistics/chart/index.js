import BarChart from "./StatisticsBarChart"; // import LineChart from './StatisticsLineChart';

// | 'LineChart';
export const createChartComponent = chartType => {
  const ChartComponents = {
    BarChart // LineChart,

  };
  return ChartComponents[chartType];
};