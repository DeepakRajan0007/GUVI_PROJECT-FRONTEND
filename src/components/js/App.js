import {BrowserRouter as Router, Routes , Route } from "react-router-dom";
import '../css/App.css';
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/home" element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
