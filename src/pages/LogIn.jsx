import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { authActions } from "../store/auth";

const LogIn = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    navigate("/");
  }
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = async () => {
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("All fields is required");
      } else {
        const response = await axios.post(
          "https://backend-steel-five-29.vercel.app/api/v1/log-in",
          data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className=" h-[98vh] flex justify-center items-center">
      <div className="w-2/6 p-4 rounded bg-gray-800">
        <h2 className="text-2xl font-semibold">LogIn</h2>
        <input
          type="username"
          name="username"
          value={data.username}
          onChange={change}
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={change}
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <div className="w-full flex justify-between items-center">
          <button
            onClick={submit}
            className="text-xl font-semibold bg-blue-400 text-black px-3 py-2 rounded"
          >
            Login
          </button>
          <div className="flex items-center">
            <p className="text-gray-400">Not having an account?</p>
            <Link
              to="/signup"
              className="text-gray-400 hover:text-gray-200 ml-1"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
