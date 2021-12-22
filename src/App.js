import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthProvider/AuthProvider";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AddHotel from "./Pages/Dashboard/AddHotel/AddHotel";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import ManageHotels from "./Pages/Dashboard/ManageHotels/ManageHotels";
import Home from "./Pages/Home/Home/Home";
import Book from "./Pages/Home/Hotels/Book";
import AdminRoute from "./Pages/Login/AdminRoute/AdminRoute";
import Login from "./Pages/Login/Login/Login";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import Register from "./Pages/Login/Register/Register";
import Payment from "./Pages/Payment/Payment";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route
            path="book/:id"
            element={
              <PrivateRoute>
                <Book />
              </PrivateRoute>
            }
          />
          <Route
            path="payment"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardHome></DashboardHome>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path={`/dashboard/makeAdmin`}
              element={
                <AdminRoute>
                  <MakeAdmin></MakeAdmin>
                </AdminRoute>
              }
            ></Route>
            <Route
              path={`/dashboard/addhotel`}
              element={
                <AdminRoute>
                  <AddHotel />
                </AdminRoute>
              }
            ></Route>
            <Route
              path={`/dashboard/managehotels`}
              element={
                <AdminRoute>
                  <ManageHotels></ManageHotels>
                </AdminRoute>
              }
            ></Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
