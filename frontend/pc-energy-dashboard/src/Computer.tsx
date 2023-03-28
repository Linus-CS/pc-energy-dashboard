import { useEffect, useState } from "react";
import "./Computer.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function Computer(props: { name: string; id: number }) {
  const [requestState, setRequestState] = useState({
    data: [],
    loading: true,
    failed: false,
  });

  useEffect(() => {
    const retrieveArticles = async () => {
      try {
        const energyValues: any = await axios.get("/computer/" + props.id);
        setRequestState((prevState) => ({
          ...prevState,
          data: energyValues,
        }));
      } catch (err) {
        setRequestState((prevState) => ({
          ...prevState,
          failed: true,
        }));
      } finally {
        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };
    retrieveArticles();
  }, []);
  return (
    <div className="Computer">
      <h1>
        <span>{props.name}</span> with id: <span>{props.id}</span>
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={requestState.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Computer;
