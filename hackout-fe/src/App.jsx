import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import moment from "moment";
import LandingPage from "./module/LandingPage/LandingPage";
import Signup from "./module/AuthPages/Signup";
import Login from "./module/AuthPages/Login";
import NavbarRouteLayout from "./module/Layouts/NavbarRouteLayout/NavbarRouteLayout";
import CalenderContext from "./module/common/contexts/CalenderContext";
import TrackerLayout from "./module/Layouts/TrackerLayout/TrackerLayout";
import { useState } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MM-YYYY")
  );
  return (
    <CalenderContext.Provider
      value={{
        today: moment().format("DD-MM-YYYY"),
        selectedDate: selectedDate,
        changeSelectedDate: setSelectedDate,
      }}
    >
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <NavbarRouteLayout>
                <LandingPage />
              </NavbarRouteLayout>
            }
          />
          <Route
            path="/statisticalTracker"
            element={
              <NavbarRouteLayout>
                <TrackerLayout>
                  <LandingPage />
                </TrackerLayout>
              </NavbarRouteLayout>
            }
          />
          <Route
            path="/medicineTracker"
            element={
              <NavbarRouteLayout>
                <TrackerLayout>
                  <LandingPage />
                </TrackerLayout>
              </NavbarRouteLayout>
            }
          />
          <Route
            path="/contractionTracker"
            element={
              <NavbarRouteLayout>
                <TrackerLayout>
                  <LandingPage />
                </TrackerLayout>
              </NavbarRouteLayout>
            }
          />
          <Route
            path="/nutrientTracker"
            element={
              <NavbarRouteLayout>
                <TrackerLayout>
                  <LandingPage />
                </TrackerLayout>
              </NavbarRouteLayout>
            }
          />
          <Route
            path="/stressHandling"
            element={
              <NavbarRouteLayout>
                <LandingPage />
              </NavbarRouteLayout>
            }
          />
        </Routes>
      </Router>
    </CalenderContext.Provider>
  );
}

export default App;
