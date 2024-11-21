import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
import { Provider } from "react-redux";
import store from "../store.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddNewBook from "./pages/AddNewBook.jsx";
import BookPage from "./pages/BookPage.jsx";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/review" element={<Review />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addnewbook" element={<AddNewBook />} />
          <Route path="/book/:id" element={<BookPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
