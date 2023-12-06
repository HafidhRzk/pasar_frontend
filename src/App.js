import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import axios from 'axios';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const LandingPage = lazy(() => import('./pages/LandingPage'))

// Initializing different libraries
initializeApp()

// Check for login and initialize axios
const token = checkAuth()

function App() {

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("/auth/check-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (localStorage.token) {
      checkUser()
    }
  }, []);

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing-page" element={<LandingPage />} />

          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />
          <Route path="*" element={<Navigate to={token ? "/app/dashboard" : "/landing-page"} replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
