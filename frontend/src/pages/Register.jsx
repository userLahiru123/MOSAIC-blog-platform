import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import { URL } from '../url'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    // Explicit validation checks
    if (!username || !email || !password) {
      setError(true)
      return // Prevent API call if validation fails
    }

    // Email format validation (optional)
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError(true)
      return // Prevent API call if email format is invalid
    }

    // Minimum password length (optional)
    const minPasswordLength = 6;
    if (password.length < minPasswordLength) {
      setError(true)
      return // Prevent API call if password is too short
    }

    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password })
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")

    } catch (err) {
      setError(true)
      console.log(err)
    }

  }

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">MOSAIC</Link></h1>
        <h3><Link to="/login">Login</Link></h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
          {error && !username && <p className="text-red-500 text-sm">Please enter your username.</p>}
          <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
          {error && !email && <p className="text-red-500 text-sm">Please enter your email.</p>}
          {error && email && !emailRegex.test(email) && <p className="text-red-500 text-sm">Please enter a valid email address.</p>}
          <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
          {error && !password && <p className="text-red-500 text-sm">Please enter your password.</p>}
          {error && password && password.length < minPasswordLength && <p className="text-red-500 text-sm">Password must be at least {minPasswordLength} characters long.</p>}
          <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Register</button>
          {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
         </div>
       </div>
    </div>
    {/* </div> */}
    
    <Footer/>
    </>
    
  )
}

export default Register

