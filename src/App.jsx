import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Wishlist from "./components/Wishlist";

const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const Profile = lazy(() => import("./pages/Profile"));
const Bookings = lazy(() => import("./pages/Bookings"));
const PracticeDriving = lazy(() => import("./pages/PracticeDriving"));
const DrivingLicense = lazy(() =>
  import("./components/DrivingLicense/PageOne")
);
const LearningLicense = lazy(() =>
  import("./components/LearningLicense/PageOne")
);
const LicenseProgress = lazy(() =>
  import("./components/LicenseProgress/LicenseProgress")
);
const DrivingDetails = lazy(() =>
  import("./components/PracticeDriving/DrivingDetails/DrivingDetails")
);
const CourseDetails = lazy(() => import("./components/Courses/CourseDetails"));
const UserCourseDetails = lazy(() =>
  import("./components/Courses/UserCourseDetails")
);
const OngoingSession = lazy(() =>
  import(
    "./components/Courses/UserCourseDetails/Session/OngoingSession/OngoingSession"
  )
);
const Session = lazy(() =>
  import("./components/Courses/UserCourseDetails/Session/Session")
);
const Login = lazy(() => import("./Auth/Login"));
import Loading from "./components/Loading";

const App = () => {
  const isWishlistOpen = useSelector((state) => state.wishlist.isWishlistOpen);
  const isUserLoginOpen = useSelector((state) => state.user.isUserLoginOpen);

  return (
    <div
      className={`font-aeonik relative h-screen ${
        isWishlistOpen || isUserLoginOpen ? "overflow-hidden" : ""
      }`}>
      <Toaster />

      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/session"
              element={
                <ProtectedRoutes>
                  <OngoingSession />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoutes>
                  <Courses />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/courses/:course"
              element={
                <ProtectedRoutes>
                  <CourseDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/courses/user/:course"
              element={
                <ProtectedRoutes>
                  <UserCourseDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/courses/user/:course/:session"
              element={
                <ProtectedRoutes>
                  <Session />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/driving-license"
              element={
                <ProtectedRoutes>
                  <DrivingLicense />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/license-progress"
              element={
                <ProtectedRoutes>
                  <LicenseProgress />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/learning-license"
              element={
                <ProtectedRoutes>
                  <LearningLicense />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/practice-driving"
              element={
                <ProtectedRoutes>
                  <PracticeDriving />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/practice-driving/:practice"
              element={
                <ProtectedRoutes>
                  <DrivingDetails />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoutes>
                  <Bookings />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Suspense>
        {isWishlistOpen && <Wishlist />}
        {isUserLoginOpen && (
          <div className="login-slider">
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          </div>
        )}
      </Router>
    </div>
  );
};

export default App;
