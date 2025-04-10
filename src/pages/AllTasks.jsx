import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData";
import axios from "axios";

const AllTasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    description: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://backend-steel-five-29.vercel.app/api/v2/all-tasks",
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
    <>
      <div className="min-h-screen">
        <div className="flex justify-end w-full px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        {Data && (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={Data.tasks}
            fetchTasks={fetchTasks}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>
      <InputData
        inputDiv={inputDiv}
        setInputDiv={setInputDiv}
        fetchTasks={fetchTasks}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
};

export default AllTasks;
