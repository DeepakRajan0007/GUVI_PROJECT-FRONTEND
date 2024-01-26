import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "../css/login.css";

function Login() {
    const history=useNavigate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

async function submit(e){
    e.preventDefault();

    try {
      console.log(process.env.REACT_APP_BACKEND_URL);
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/`, {
        email,
        password,
      });
  
      if (response.data === "exist") {
        history("/home", { state: { email } });
      } else if (response.data === "notexist") {
        alert("User doesn't exist or incorrect password");
      }
    } catch (error) {
      alert("An error occurred during authentication");
      console.error("Error during authentication:", error);
    }
    
}

    return(
        <div className="Login">
            <h1>Login Page</h1>
             <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
                <input type="submit" onClick={submit} />
             </form>
             <p>OR</p>
             <Link to="/signup">Signup Page</Link>
        </div>
    )
}

export default Login