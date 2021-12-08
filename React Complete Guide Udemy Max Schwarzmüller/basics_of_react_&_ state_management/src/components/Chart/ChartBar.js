import "./ChartBar.css";

const ChartBar = ({ value, maxValue, label }) => {
  let chartBarHeight = "0%";
  if (maxValue > 0) {
    chartBarHeight = Math.round((value / maxValue) * 100) + "%";
  }
  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        {/* Giving the chart bar its dynamic height using the style object on chart-bar__fill.
              Note - "-" wali css ppts ko hum camelCase me dete he. */}
        <div
          className="chart-bar__fill"
          style={{ height: chartBarHeight }}
        ></div>
      </div>
      <div className="chart-bar__label">{label}</div>
    </div>
  );
};

export default ChartBar;
