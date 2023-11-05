import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import moment from "moment";
import LandingPage from "./module/LandingPage/LandingPage";
import Signup from "./module/AuthPages/Signup";
import Login from "./module/AuthPages/Login";
import NavbarRouteLayout from "./module/Layouts/NavbarRouteLayout/NavbarRouteLayout";
import CalenderContext from "./module/common/contexts/CalenderContext";
import TrackerLayout from "./module/Layouts/TrackerLayout/TrackerLayout";
import { ProtectedRoute } from "./module/common/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./module/common/hooks/useAuth";
import NutrientTrackerPage from "./module/NutrientTrackerPage/NutrientTrackerPage";
import StatisticalTrackerPage from "./module/StatisticalTrackerPage/StatisticalTrackerPage";
import StressHandling from "./module/StressHandling/StressHandling";
import MidFile from "./module/StressHandling/Components/MidFile/MidFile";
import "./App.scss";

function App() {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MM-YYYY")
  );

  return (
    <CalenderContext.Provider
      value={{
        today: moment().format("DD-MM-YYYY"),
        selectedDate,
        changeSelectedDate: setSelectedDate,
      }}
    >
      <Router>
        <AuthProvider>
          <div className="app-container">
            <NavbarRouteLayout>
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/statisticalTracker"
                  element={
                    <ProtectedRoute>
                      <TrackerLayout>
                        <StatisticalTrackerPage />
                      </TrackerLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/medicineTracker"
                  element={
                    <ProtectedRoute>
                      <TrackerLayout>
                        <LandingPage />
                      </TrackerLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/contractionTracker"
                  element={
                    <ProtectedRoute>
                      <TrackerLayout>
                        <LandingPage />
                      </TrackerLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/nutrientTracker"
                  element={
                    <ProtectedRoute>
                      <TrackerLayout>
                        <NutrientTrackerPage />
                      </TrackerLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/stressHandling"
                  element={
                    <ProtectedRoute>
                      <StressHandling />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/stressHandling/1"
                  element={
                    <ProtectedRoute>
                      <MidFile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </NavbarRouteLayout>
          </div>
        </AuthProvider>
      </Router>
    </CalenderContext.Provider>
  );
}

export default App;
