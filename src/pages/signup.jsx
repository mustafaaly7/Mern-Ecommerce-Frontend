import { Link } from "react-router";



export default function Signup() {
    return (
        <>
            <div className="min-h-screen bg-zinc-800 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-zinc-900 rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl text-center text-zinc-200 font-semibold mb-8">Signup</h1>

                    <form className="space-y-6">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullname" className="block text-lg text-zinc-100 mb-2">Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                className="w-full px-4 py-2 bg-zinc-200 text-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
                                placeholder="Enter Your Full Name"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-lg text-zinc-100 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
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
                                className="w-full px-4 py-2 bg-zinc-200 text-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
                                placeholder="Enter Your Password"
                                required
                            />
                        </div>

                        {/* Address Field (Textarea) */}
                        <div>
                            <label htmlFor="address" className="block text-lg text-zinc-100 mb-2">Address</label>
                            <textarea
                                id="address"
                                className="w-full px-4 py-2 bg-zinc-200 text-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-y min-h-[80px]"
                                placeholder="Enter Your Address"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-zinc-700 text-zinc-200 py-2 px-4 rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-colors duration-200"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    {/* Additional Links (e.g., Login) */}
                    <div className="mt-6 text-center">
                        <p className="text-zinc-400">Already have an account? <Link to="/login" className="text-zinc-200 hover:underline">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}