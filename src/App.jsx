import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  
  return (
    <>
      <div style={{ height: "100vh" }}>
        <Routes>
          <Route path="/login" exact={true} element={<LoginPage />} />
          <Route path="/signup" exact={true} element={<SignUpPage />} />
        </Routes>
      </div>
    </>
  );
}
