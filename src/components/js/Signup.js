import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";

function Signup() {
  const history = useNavigate();

  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Dob, setDob] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (!Name || !email || !password || !confirmPassword || !Dob || !gender) {
        alert("All fields are required");
        return;
      }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Invalid email address");
        return;
      }
      if (!Name || !email || !password || !confirmPassword || !Dob) {
        alert("All fields are required");
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        alert("Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
        return;
      }
      
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }

    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
          Name,
          email,
          gender,
          password,
          Dob,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data === "notexist") {
            history("/home", { state: { email } });
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Signup-container">
      <h1>Sign up</h1>

      <form action="POST">
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
         <input
          type="text"
          onChange={(e) => {
            setGender(e.target.value);
          }}
          placeholder="gender"
        />
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          placeholder="Confirm Password"
        />
        <input
          type="date"
          onChange={(e) => {
            setDob(e.target.value);
          }}
          placeholder="Dob"
        />
        <input type="submit" onClick={submit} />
      </form>

      <p>OR</p>

      <Link to="/">Login Page</Link>
    </div>
  );
}

export default Signup;
