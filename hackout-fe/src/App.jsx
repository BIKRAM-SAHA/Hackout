import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./module/LandingPage/LandingPage";
import Signup from "./module/AuthPages/Signup";
import Login from "./module/AuthPages/Login";
import NavbarRouteLayout from "./module/Layouts/NavbarRouteLayout/NavbarRouteLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <NavbarRouteLayout>
              <LandingPage />
            </NavbarRouteLayout>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
