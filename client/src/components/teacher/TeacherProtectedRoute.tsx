import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const TeacherProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("teacher_token");
  if (!token) {
    return <Navigate to="/teacher/login" replace />;
  }
  return <>{children}</>;
};

export default TeacherProtectedRoute;
