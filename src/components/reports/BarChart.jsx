import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="w-full rounded-lg shadow-md p-2 flex flex-col justify-center items-center">
      <div className="w-full overflow-x-scroll z-0">
        <BarChart
          className="text-xs z-0"
          data={data}
          barGap={0}
          width={1000}
          height={400}
        >
          <CartesianGrid strokeDasharray="3 3" strokeWidth={2} />
          <XAxis dataKey="name" />
          {/* <YAxis className="text-xs" /> */}
          <Tooltip />
          {/* <Legend  /> */}
          <Bar dataKey="income" fill="#059669" className="z-0" />
          <Bar dataKey="expanse" fill="#EF4444" className="z-0" />
        </BarChart>
      </div>
    </div>
    // <ResponsiveContainer
    // className={"z-0"}
    //   width={"100%"}
    //   height={400}

    // >
    // {/* </ResponsiveContainer> */}
  );
};

export default Chart;
