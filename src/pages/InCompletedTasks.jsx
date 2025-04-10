import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const InCompletedTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://backend-steel-five-29.vercel.app/api/v2/incomplete-tasks",
        {
          headers,
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen">
      <Cards home={false} data={Data} fetchTasks={fetchTasks} />
    </div>
  );
};

export default InCompletedTasks;
