import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthProvider/AuthProvider";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Home from "./Pages/Home/Home/Home";
import Book from "./Pages/Home/Hotels/Book";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import Payment from "./Pages/Payment/Payment";
import NavigationBar from "./Pages/Shared/NavigationBar/NavigationBar";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="payment" element={<Payment />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
