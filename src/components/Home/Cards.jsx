import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, fetchTasks,setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `https://backend-steel-five-29.vercel.app/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const handleImportantTask = async (id) => {
    try {
      const response = await axios.put(
        `https://backend-steel-five-29.vercel.app/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      console.log(response.data.message);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://backend-steel-five-29.vercel.app/api/v2/delete-task/${id}`,
       
        { headers }
      );
      console.log(response.data.message);
      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateTask = async (id,title,description) => {
    setInputDiv("fixed")
    setUpdatedData({id:id,title:title,description:description})
 
  };
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-sm p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.description}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                onClick={() => handleCompleteTask(items._id)}
                className={`${
                  items.complete === false ? "bg-red-400" : "bg-green-700"
                } p-2 rounded w-3/6`}
              >
                {items.complete === true ? "Completed" : "In Completed"}
              </button>
              <div className="text-white w-3/6 flex justify-around text-2xl font-semibold p-2">
                <button onClick={() => handleImportantTask(items._id)}>
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                {home!==false && (<button onClick={() => handleUpdateTask(items._id,items.title,items.description)}>
                  <FaEdit />
                </button>)}
                <button onClick={() => handleDeleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="bg-gray-800 rounded-sm p-4 flex flex-col justify-center items-center text-gray-300 
            hover:scale-105 hover:cursor-pointer transition-all duration-300"
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
