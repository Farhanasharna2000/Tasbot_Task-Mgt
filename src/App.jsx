import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import InCompletedTasks from "./pages/InCompletedTasks";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const localId = localStorage.getItem("id");
    const localToken = localStorage.getItem("token");
    const localLoggedIn = localStorage.getItem("isLoggedIn");

    if ((localId && localToken) || localLoggedIn === "true") {
      dispatch(authActions.login());
    } else {
      navigate("/signup");
    }
  }, [dispatch, navigate]);
  return (
    <div className="bg-gray-900 text-white p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/importantTasks" element={<ImportantTasks />} />
          <Route path="/completedTasks" element={<CompletedTasks />} />
          <Route path="/incompletedTasks" element={<InCompletedTasks />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
};

export default App;
