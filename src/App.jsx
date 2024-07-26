import { Routes, Route } from "react-router-dom";
import CustomLayout from "./components/router/CustomLayout";
import RequireAuth from "./components/router/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import MyTasks from "./pages/MyTasks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my_tasks" element={<MyTasks />} />
        {/* <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
          <Route path="/my_tasks" element={<MyTasks />} />
        </Route> */}
      </Route>
    </Routes>
  );
};

export default App;
