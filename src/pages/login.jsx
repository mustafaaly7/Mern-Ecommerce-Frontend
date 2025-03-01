import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { routes } from "../constants/constant";



export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const loginSubmit = async (e) => {
        e.preventDefault()
        try {
            if (email === "" ||
                password === "" ) {

                toast.error("ALL Fields Are required");
            }
            const values = {
                email: email,
                password : password,
            }

const response  = await axios.post(routes.login,values)
toast.success(response.data.message || "Signup successful!");
            
setTimeout(()=>{
    navigate('/')
},4000)


        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
console.log("error" , error);

        }


    }


    return (
        <>
            <div className="min-h-screen bg-zinc-800 flex items-center justify-center p-4">
                <ToastContainer />

                <div className="w-full max-w-md bg-zinc-900 rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl text-center text-zinc-200 font-semibold mb-8">Login</h1>

                    <form className="space-y-6" onSubmit={loginSubmit}>
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-lg text-zinc-100 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => { setEmail(e.target.value) }}
                                value={email}
                                className="w-full px-4 py-2 bg-zinc-200 text-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-lg text-zinc-100 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                value={password}
                                className="w-full px-4 py-2 bg-zinc-200 text-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
                                placeholder="Enter Your Password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-zinc-700 text-zinc-200 py-2 px-4 rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-colors duration-200"
                            >
                                Log In
                            </button>
                        </div>
                    </form>

                    {/* Additional Links (e.g., Signup) */}
                    <div className="mt-6 text-center">
                        <p className="text-zinc-400">Don't have an account? <Link to="/signup" className="text-zinc-200 hover:underline">Signup</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}