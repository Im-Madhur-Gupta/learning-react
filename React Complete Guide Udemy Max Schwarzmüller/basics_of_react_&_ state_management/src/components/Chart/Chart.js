import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = ({ chartData }) => {
  const chartValues = chartData.map((barData) => barData.value);
  const maxValue = Math.max(...chartValues);
  return (
    <div className="chart">
      {chartData.map(({label,value}) => (
        <ChartBar
          key={label}
          value={value}
          maxValue={maxValue}
          label={label}
        />
      ))}
    </div>
  );
};

export default Chart;
