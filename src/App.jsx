import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/auth/PersistLogin";
import CustomLayout from "./components/auth/CustomLayout";
import RequireAuth from "./components/auth/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Test from "./pages/Test";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomLayout />}>
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
