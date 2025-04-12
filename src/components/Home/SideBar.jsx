import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { googleLogout } from '@react-oauth/google';

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted tasks",
      icon: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    googleLogout();
    navigate("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://backend-steel-five-29.vercel.app/api/v2/all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);
  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center gap-3 hover:bg-gray-600 rounded p-2 transition-all duration-300"
          >
            <span>{items.icon}</span>
            {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button onClick={logout} className="bg-gray-600 p-2 rounded w-full">
          Log Out
        </button>
      </div>
    </>
  );
};

export default SideBar;
