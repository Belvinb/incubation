import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandinPage/LandingPage";
import Loginpage from "./components/LoginPage/Loginpage";
import SignupPage from "./components/SignupPage/SignupPage";
import HomePage from "./components/HomePage/HomePage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminLanding from "./components/AdminLanding/AdminLanding";
import EditUser from "./components/AdminDashboard/EditUser";
import AdminHome from "./components/AdminHome/AdminHome";
import AdminHeader from "./components/Header/AdminHeader";
import AdminRecordList from "./components/AdminRecordList/AdminRecordList";
import ViewDetails from "./components/AdminHome/viewDetails";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Routes>
        {/* <Route path="/" element={<Loginpage />} exact /> */}
        {/* <Route path="/login" element={<Loginpage />} exact /> */}
        {/* <Route path="/signup" element={<SignupPage />} exact />
        <Route path="/home" element={<HomePage />} exact /> */}

        <Route element={<Header />}>
          <Route path="/" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route element={<AdminHeader />}>
          <Route path="/admin" element={<AdminLanding />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/recordList" element={<AdminRecordList />} />
          <Route path="/viewDetails/:applicationId" element={<ViewDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
