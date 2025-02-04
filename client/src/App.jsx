import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterCustomer from "./pages/RegisterCustomer";
import RegisterAdmin from "./pages/RegisterAdmin";
import AdminLogin from "./pages/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Routes>
          <Route path="/register-customer" element={<RegisterCustomer />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
