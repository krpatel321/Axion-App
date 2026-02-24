// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import AppButton from './components/common/AppButton'
import HeroSection from './pages/HeroSec.tsx';
import Navbar from './pages/Navbar.tsx';
import SecondSec from "./pages/SecondSec.tsx";
import ThirdSec from "./pages/ThirdSec.tsx";
import Forth from "./pages/Forth.tsx";
import Fifth from "./pages/Fifth.tsx";
import Sixth from "./pages/Sixth.tsx"
import Seventh from "./pages/Seventh.tsx";
import Eighth from "./pages/Eighth.tsx";
import Tenth from "./pages/Tenth.tsx";
import Footer from "./pages/Footer.tsx";
import Login from './pages/Login.tsx';
import Register from "./pages/Register.tsx";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
// import Dashboard from './pages/Dashboard.tsx';
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <SecondSec />
              <ThirdSec />
              <Forth />
              <Fifth />
              <Sixth />
              <Seventh />
              <Eighth />
              <Tenth />
             
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/features" element={<Features />} />
<Route path="/pricing" element={<Pricing />} />
<Route path="/community" element={<Community />} />
<Route path="/blog" element={<Blog />} />
      </Routes>
       <Footer />
    </Router>
  );
}
export default App;