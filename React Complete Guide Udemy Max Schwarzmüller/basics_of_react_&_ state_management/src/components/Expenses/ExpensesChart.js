import Chart from "../Chart/Chart";

const ExpensesChart = ({ filteredExpenses }) => {
  const chartData = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];
  for (let expense of filteredExpenses) {
    console.log(expense.expensePrice);
    console.log(expense.expenseDate.getMonth());
    let expenseMonth = expense.expenseDate.getMonth();
    chartData[expenseMonth].value += Number(expense.expensePrice);
    console.log("ChartData index value " + chartData[expenseMonth].value);
  }
  return <Chart chartData={chartData} />;
};

export default ExpensesChart;
