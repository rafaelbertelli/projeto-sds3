import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
  labels: string[];
  series: number[];
};

function DonutChart() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`).then((res) => {
      const data = res.data as SaleSum[];

      setChartData({
        labels: data.map((x) => x.sellerName),
        series: data.map((x) => x.sum),
      });
    });
  }, []);

  const options = { legend: { show: true } };

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
}

export default DonutChart;
