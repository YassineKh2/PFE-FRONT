import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import MutalFund from "./pages/Mutual Funds/MutalFund";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SavedFunds from "./pages/Mutual Funds/Backend/SavedFunds";
import HomePage from "./pages/Home";
import Calculators from "./pages/Calculators";
import TrendingFunds from "./pages/Mutual Funds/TrendingFunds";
import FilterFunds from "./pages/Mutual Funds/FilterFunds";
import Onboarding from "./pages/Onboarding/Onboarding";
import RecommendedFunds from "./pages/Mutual Funds/RecommendedFunds";
import Courses from "./pages/Courses/Backend/Courses";
import CoursesFront from "./pages/Courses/Frontend/Courses";
import Landing from "./pages/Courses/Frontend/Landing";
import AddCourse from "./pages/Courses/Backend/AddCourse";
import EditCourse from "./pages/Courses/Backend/EditCourse";
import ViewCourse from "./pages/Courses/Backend/ViewCourse";
import AddChapter from "./pages/Chapters/Backend/AddChapter";
import EditChapter from "./pages/Chapters/Backend/EditChapter";
import Chapter from "./pages/Chapters/Frontend/Chapter";
import Course from "./pages/Courses/Frontend/Course";
import { useAuth } from "./providers/AuthProvider";
import MyCourses from "./pages/Courses/Backend/MyCourses";
import AllMyCourses from "./pages/Courses/Backend/AllMyCourses";
import Certificates from "./pages/Courses/Backend/Certificates";
import Certificate from "./pages/Courses/Frontend/Certificate";
import Congtats from "./pages/Courses/Frontend/Congtats";
import Quiz from "./pages/Courses/Frontend/Quiz";
import CompareFunds from "./pages/Mutual Funds/CompareFunds";
import Deposit from "./pages/Deposit/Deposit";
import CreateDeposit from "./pages/Deposit/CreateDeposit";
import Manager from "./pages/Manager/Manager";

import IndexPage from "@/pages/index";
import MyDeposit from "./pages/Deposit/Backend/MyDeposit";

const ProtectedRoutes = () => {
  const { userLoggedIn } = useAuth();

  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoutes = () => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser.role === "admin";

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<IndexPage />} path="/" />
      <Route element={<HomePage />} path="home" />
      <Route element={<MutalFund />} path="fund/:id" />
      <Route element={<CompareFunds />} path="compare" />
      <Route element={<Login />} path="login" />
      <Route element={<Signup />} path="signup" />
      <Route element={<Calculators />} path="calculator" />
      <Route element={<TrendingFunds />} path="trending" />
      <Route element={<FilterFunds />} path="filter" />
      <Route element={<Onboarding />} path="onboarding" />
      <Route element={<RecommendedFunds />} path="recommended" />
      <Route element={<Landing />} path="courses" />
      <Route element={<CoursesFront />} path="courses/all" />
      <Route element={<Course />} path="courses/view/:id" />
      <Route element={<Deposit />} path="deposit" />
      <Route element={<CreateDeposit />} path="deposit/create" />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        {/* E-Learning Paths */}
        <Route element={<Chapter />} path="courses/chapter/:id" />
        <Route element={<MyCourses />} path="dashboard/courses/overview" />
        <Route element={<AllMyCourses />} path="dashboard/courses/owned" />
        <Route
          element={<Certificates />}
          path="dashboard/courses/mycertificates"
        />
        <Route element={<Certificate />} path="courses/Certificate/:id" />
        <Route element={<Congtats />} path="courses/congrats/:id" />
        <Route element={<Quiz />} path="courses/quiz/:id" />

        {/* Funds Paths  */}
        <Route element={<SavedFunds />} path="dashboard/savedfunds" />

        {/* Manager Paths  */}
        <Route element={<Manager />} path="dashboard/manager" />

        {/* Deposit Paths  */}
        <Route element={<MyDeposit />} path="dashboard/mydeposit" />

        {/* Admin Dashboard Routes */}
        <Route element={<AdminRoutes />}>
          <Route element={<Courses />} path="dashboard/courses/all" />
          <Route element={<AddCourse />} path="dashboard/courses/add" />
          <Route element={<EditCourse />} path="dashboard/courses/edit/:id" />
          <Route
            element={<ViewCourse />}
            path="dashboard/courses/details/:id"
          />
          <Route element={<AddChapter />} path="dashboard/chapter/add/:id" />
          <Route element={<EditChapter />} path="dashboard/chapter/edit/:id" />
          <Route element={<EditChapter />} path="dashboard/chapter/edit/:id" />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
