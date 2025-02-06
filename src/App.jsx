import { Navigate, Route, Routes, useNavigate } from 'react-router'
import './App.css'
import Home from './components/Base/Home/Home'
import Studio from './components/Studio/Studio'
import Uploader from './components/Studio/Uploader/Uploader'
import { useEffect } from 'react'
const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  console.log(localStorage.getItem("authToken"))
  return localStorage.getItem("authToken") ? children : <Navigate to="/" />;
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're on the "/auth" route
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store token in localStorage
      localStorage.setItem("authToken", token);
      // Clean up the URL by removing the token
      window.history.replaceState(null, "", window.location.pathname);
      // Redirect to the dashboard after storing the token
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<div>Loading...</div>} /> {/* No component needed */}

          <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>}>

        <Route path="studio" element={<Studio/>}>
          <Route path="uploader" element={<Uploader />}/>
          </Route>
          </Route>
      </Routes>
    </>
  )
}

export default App
