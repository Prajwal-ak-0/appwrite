"use client"

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

export default function LoginPage() {

    const [loading,setLoading]=useState(false);
    const router=useRouter();

    const [user,setUser]=useState({
        email:"",
        password:""
    })

    const onLogin=async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login Success",response.data);
            toast.success("Login Success");
            router.push("/profile"); 
        } catch (error:any) {
            console.log("Login Failed",error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col md:w-[35%] w-[50%] mx-auto mt-32">
        <h1 className="text-center pb-2">Login</h1>
        <hr/>
        <label className="pt-2" htmlFor="email">Email</label>
        <input
         className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
         placeholder="Email"
         type="text"
         id="email"
         value={user.email}
         onChange={(e)=>setUser({...user,email:e.target.value})}
        />
        <label htmlFor="password">Password</label>
        <input
         className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
         placeholder="Password"
         type="password"
         id="password"
         value={user.password}
         onChange={(e)=>setUser({...user,password:e.target.value})}
        />
        <button
         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
         onClick={onLogin}
        >
            {loading?"Loading...":"Login"}
        </button>
        <Link href="/signup">
            Does not have an account? SignUp
        </Link>
        </div>
    )
}