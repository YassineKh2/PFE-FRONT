import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import MutalFund from "./pages/Mutual Funds/MutalFund";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SavedFunds from "./pages/Mutual Funds/SavedFunds";
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

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<IndexPage />} path="/" />
      <Route element={<HomePage />} path="home" />
      <Route element={<MutalFund />} path="fund/:id" />
      <Route element={<Login />} path="login" />
      <Route element={<Signup />} path="signup" />
      <Route element={<SavedFunds />} path="savedfunds" />
      <Route element={<Calculators />} path="calculator" />
      <Route element={<TrendingFunds />} path="trending" />
      <Route element={<FilterFunds />} path="filter" />
      <Route element={<Onboarding />} path="onboarding" />
      <Route element={<RecommendedFunds />} path="recommended" />
      <Route element={<Landing />} path="courses" />
      <Route element={<CoursesFront />} path="courses/all" />
      <Route element={<Course />} path="courses/view/:id" />
      <Route element={<Chapter />} path="courses/chapter/:id" />

      {/* Dashboard Routes */}
      <Route element={<Courses />} path="dashboard/courses" />
      <Route element={<AddCourse />} path="dashboard/courses/add" />
      <Route element={<EditCourse />} path="dashboard/courses/edit/:id" />
      <Route element={<ViewCourse />} path="dashboard/courses/details/:id" />
      <Route element={<AddChapter />} path="dashboard/chapter/add/:id" />
      <Route element={<EditChapter />} path="dashboard/chapter/edit/:id" />
      <Route element={<EditChapter />} path="dashboard/chapter/edit/:id" />
    </Routes>
  );
}

export default App;
