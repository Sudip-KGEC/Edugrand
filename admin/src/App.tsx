import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";

const Dashboard = lazy(() => import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const Scholarships = lazy(() => import("./pages/Scholarships").then((m) => ({ default: m.Scholarships })));
const Inquiries = lazy(() => import("./pages/Inquiries").then((m) => ({ default: m.Inquiries })));

function Protected({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center text-muted">Loading</div>;
  if (!admin) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Suspense fallback={<div className="p-8 text-muted">Loading</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="scholarships" element={<Scholarships />} />
          <Route path="inquiries" element={<Inquiries />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
