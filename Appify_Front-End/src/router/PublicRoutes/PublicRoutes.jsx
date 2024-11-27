import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "../../screens/Login/LoginScreen";
import SignUpScreen from "../../screens/SignUp/SignUpScreen";
import { AppContext } from "../../context/AppContext";
import ProgressBar from "../../components/Loader/LoaderLogin";
const PublicRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { signUpCode, setSignUpCode } = useContext(AppContext);

  useEffect(() => {
    getValueLocalStorage();
  }, []);

  function getValueLocalStorage() {
    setProgress(30);
    const codeScreen = localStorage.getItem("code_screen");
    if (codeScreen) {
      setSignUpCode(true);
    } else {
      setSignUpCode(false);
    }
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 250);
    setTimeout(() => {
      setProgress(100);
      setLoading(false);
    }, 6000);
  }

  return (
    <Routes>
      {loading === true ? (
        <Route
          path="/*"
          element={
            <>
              <ProgressBar loading={loading} progress={progress} />
              <div>Loading...</div>
            </>
          }
        />
      ) : (
        <>
          {signUpCode === true ? (
            <>
              <Route path="/code" element={<SignUpScreen />} />
              <Route path="/*" element={<Navigate to="/code" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </>
      )}
    </Routes>
  );
};

export default PublicRoutes;
