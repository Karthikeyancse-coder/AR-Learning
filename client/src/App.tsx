import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginPage from "./components/no_auth/LoginPage";
import SignupPage from "./components/no_auth/SignupPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Home from "./components/dashboard/Home";
import Chemistry from "./components/dashboard/Chemistry";
import Biology from "./components/dashboard/Biology";
import SelfStudy from "./components/dashboard/SelfStudy";
import TodoList from "./components/dashboard/TodoList";
import Profile from "./components/dashboard/Profile";
import InorganicReaction from "./components/auth/chapters/chemistry/inorganic/InorganicReaction";
import Assessment from "./components/auth/chapters/chemistry/Assessment";
import HumanAnatomy from "./components/dashboard/biology/human_anatomy/HumanAnatomy";
import ChallengeFlow from "./components/dashboard/ChallengeFlow";
import Billing from "./components/dashboard/Billing";
import SecurityPrivacy from "./components/dashboard/SecurityPrivacy";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthContext";

// Teacher Portal
import TeacherLogin from "./components/teacher/TeacherLogin";
import TeacherLayout from "./components/teacher/TeacherLayout";
import TeacherProtectedRoute from "./components/teacher/TeacherProtectedRoute";
import TeacherHome from "./components/teacher/TeacherHome";
import QuizBuilder from "./components/teacher/QuizBuilder";
import AssignmentBuilder from "./components/teacher/AssignmentBuilder";
import PublishedTasks from "./components/teacher/PublishedTasks";
import Submissions from "./components/teacher/Submissions";
import AssignmentReview from "./components/teacher/AssignmentReview";
import QuizResults from "./components/teacher/QuizResults";
import StudentsPage from "./components/teacher/StudentsPage";
import Analytics from "./components/teacher/Analytics";
import StudentInsights from "./components/teacher/StudentInsights";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      // ── Student Portal ────────────────────────────
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/home" replace />,
          },
          { path: "home", element: <Home /> },
          { path: "chemistry", element: <Chemistry /> },
          { path: "chemistry/:chapterId", element: <InorganicReaction /> },
          { path: "chemistry/assessment/:chapterId", element: <Assessment /> },
          { path: "biology", element: <Biology /> },
          { path: "biology/:chapterId", element: <HumanAnatomy /> },
          { path: "self-study", element: <SelfStudy /> },
          { path: "todo", element: <TodoList /> },
          { path: "challenge", element: <ChallengeFlow /> },
          { path: "profile", element: <Profile /> },
          { path: "billing", element: <Billing /> },
          { path: "security", element: <SecurityPrivacy /> },
        ],
      },
      // ── Teacher Portal ─────────────────────────────
      {
        path: "/teacher/login",
        element: <TeacherLogin />,
      },
      {
        path: "/teacher",
        element: (
          <TeacherProtectedRoute>
            <TeacherLayout />
          </TeacherProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="/teacher/home" replace /> },
          { path: "home", element: <TeacherHome /> },
          { path: "quizzes", element: <PublishedTasks /> },
          { path: "assignments", element: <PublishedTasks /> },
          { path: "courses", element: <PublishedTasks /> },
          { path: "quiz-builder", element: <QuizBuilder /> },
          { path: "assignment-builder", element: <AssignmentBuilder /> },
          { path: "submissions", element: <Submissions /> },
          { path: "review", element: <AssignmentReview /> },
          { path: "quiz-results", element: <QuizResults /> },
          { path: "students", element: <StudentsPage /> },
          { path: "analytics", element: <Analytics /> },
          { path: "insights", element: <StudentInsights /> },
          { path: "notifications", element: <TeacherHome /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
