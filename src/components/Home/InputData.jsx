import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
const InputData = ({
  inputDiv,
  setInputDiv,
  fetchTasks,
  updatedData,
  setUpdatedData,
}) => {
  const [data, setData] = useState({ title: "", description: "" });

  useEffect(() => {
    setData({ title: updatedData.title, description: updatedData.description });
  }, [updatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitData = async () => {
    if (data.title === "" || data.description === "") {
      alert("All fields are required");
    } else {
      await axios.post("https://backend-steel-five-29.vercel.app/api/v2/create-task", data, {
        headers,
      });
      setData({ title: "", description: "" });
      setInputDiv("hidden");
      fetchTasks();
    }
  };

  const updateData = async () => {
    if (data.title === "" || data.description === "") {
      alert("All fields are required");
    } else {
    await axios.put(`https://backend-steel-five-29.vercel.app/api/v2/update-task/${updatedData.id}`, data, {
      headers,
    });
    setUpdatedData({
      id: "",
      title: "",
      description: "",
    });
    setData({ title: "", description: "" });

    setInputDiv("hidden");}
    fetchTasks()
  };
  return (
    <>
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}
      ></div>

      <div
        className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  title: "",
                  description: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  description: "",
                });
              }}
              className="text-2xl"
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={data.title}
            onChange={change}
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
          />
          <textarea
            name="description"
            value={data.description}
            onChange={change}
            id=""
            cols="30"
            rows="10"
            placeholder="Description...... "
            className="px-3 py-2 my-3 rounded w-full bg-gray-700"
          ></textarea>
          {updatedData.id === "" ? (
            <button
              onClick={submitData}
              className="px-3 py-2 text-black rounded text-xl font-semibold bg-blue-400"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={updateData}
              className="px-3 py-2 text-black rounded text-xl font-semibold bg-blue-400"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
