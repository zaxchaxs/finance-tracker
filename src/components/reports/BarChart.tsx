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

type PropsType = {
  data: any[];
  bars: {
    dataKey: string;
    color: string;
  }[];
  xAxisDataKey: string;
  yAxisDataKey?: string;
  legens?: boolean;
  width?: number;
  height?: number;
}

const BarReChart = ({ data, bars, xAxisDataKey, yAxisDataKey, legens, width = 900, height = 400 }: PropsType) => {
  return (
    <div className="w-full rounded-lg border-2 border-secondary border-opacity-15 shadow-md shadow-gray-600 p-2 flex flex-col justify-center items-center">
      <div className="w-full overflow-x-scroll z-0">
        <BarChart
          className="text-xs z-0"
          data={data}
          barGap={0}
          width={width}
          height={height}
        >
          <CartesianGrid strokeDasharray="3 3" strokeWidth={2} />
          <XAxis dataKey={xAxisDataKey} />
          {yAxisDataKey && <YAxis className="text-xs hidden" />}
          <Tooltip />
          {legens && <Legend />}
          {bars.map((item, idx) => (
            <Bar
              key={idx}
              dataKey={item.dataKey}
              fill={item.color}
              className="z-0"
              radius={3}
            />
          ))}
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

export default BarReChart;
