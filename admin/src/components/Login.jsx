import React, {useState} from "react";
import axios from "axios";
import {baseURL} from "../App.jsx";
import {toast} from "react-toastify";

const Login = ({setToken}) => {
    const [email, setEmail] = useState("tatkimchhae@gmail.com");
    const [password, setPassword] = useState("12345678");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/api/user/admin`, {email, password});
            if (response.status === 200) {
                setToken(response.data.token);
                localStorage.setItem("authToken", response.data.token); // optional: save token
            }
        } catch (e) {
            console.log(e);
            toast.error(e.response?.data?.msg || e.message || "Something went wrong");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Email</p>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="email"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="password"
                            placeholder="Your Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 w-full py-2 px-4 rounded-md bg-black text-white cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
