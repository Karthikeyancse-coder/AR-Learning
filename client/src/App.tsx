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
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "chemistry",
            element: <Chemistry />,
          },
          {
            path: "chemistry/:chapterId",
            element: <InorganicReaction />,
          },
          {
            path: "chemistry/assessment/:chapterId",
            element: <Assessment />,
          },
          {
            path: "biology",
            element: <Biology />,
          },
          {
            path: "biology/:chapterId",
            element: <HumanAnatomy />,
          },
          {
            path: "self-study",
            element: <SelfStudy />,
          },
          {
            path: "todo",
            element: <TodoList />,
          },
          {
            path: "challenge",
            element: <ChallengeFlow />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "billing",
            element: <Billing />,
          },
          {
            path: "security",
            element: <SecurityPrivacy />,
          },
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
