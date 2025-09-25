import { LineChart } from "@mui/x-charts";
import styles from "./hourlychart.module.css";

interface Props {
  temp_data: number[];
  rain_data: number[];
}

export default function Hourlychart(props: Props) {
  return (
    <div className={styles.chart}>
      <LineChart
        title="Hourly Focast"
        series={[
          {
            data: props.temp_data,
            label: "temp (°C)",
          },
          {
            data: props.rain_data,
            label: "rain (%)",
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: [
              "00:00",
              "01:00",
              "02:00",
              "03:00",
              "04:00",
              "05:00",
              "06:00",
              "07:00",
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
            ],
          },
        ]}
        yAxis={[{ width: 100 }]}
      />
    </div>
  );
}
