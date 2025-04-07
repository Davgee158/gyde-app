import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signupPage";
import OnboardingWizard from "./pages/onboardingWizard";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import SetPinPage from "./pages/SetPinPage";
import ConfirmPinPage from "./pages/confirmPinPage";
import EnterPinPage from "./pages/EnterPinPage";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/otp" element={<OtpVerificationPage />} />
        <Route path="/setpin"element={<SetPinPage />} />
        <Route path="/confirmpin" element={<ConfirmPinPage />} />
        <Route path="/enterpin" element={<EnterPinPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

      </Routes>
    </Router>
    
  );
}



export default App
